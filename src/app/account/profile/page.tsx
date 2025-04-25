'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  Avatar,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import { ArrowLeftIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useToast } from 'context/ToastContext';
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';

// Dynamic config
export const dynamic = 'force-dynamic';
// Use a numeric revalidation value (in seconds) instead
export const revalidate = 0;

export default function AccountProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const auth = getAuth();
  const userProfile = userProfileHook();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photoURL: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Use local state to display user data without MongoDB
          setUserData({
            name: user.displayName || '',
            email: user.email || '',
            phone: '',
            address: '',
            photoURL: user.photoURL || '',
          });

          setFormData({
            ...formData,
            name: user.displayName || '',
            email: user.email || '',
            phone: '',
            address: '',
          });
        } catch (error) {
          showToast(
            'Error',
            'Failed to load profile',
            'Could not fetch user profile data.',
          );
        }
      } else {
        router.push('/auth/signin');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Update local state
        setUserData({
          ...userData,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        });

        showToast(
          'Success',
          'Profile Updated',
          'Your profile information has been updated successfully.',
        );
      }
    } catch (error) {
      showToast(
        'Error',
        'Update Failed',
        'Could not update profile information.',
      );
    }
  };

  const handleUpdatePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      showToast(
        'Error',
        'Password Mismatch',
        'New password and confirmation do not match.',
      );
      return;
    }

    if (formData.newPassword.length < 6) {
      showToast(
        'Warning',
        'Weak Password',
        'Password must be at least 6 characters long.',
      );
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, formData.newPassword);
        showToast(
          'Success',
          'Password Updated',
          'Your password has been changed successfully.',
        );
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      showToast(
        'Error',
        'Update Failed',
        'Could not update password. Please sign in again.',
      );
    }
  };

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-5xl px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center">
            <Button
              startIcon={<ArrowLeftIcon className="h-4 w-4" />}
              onClick={() => router.back()}
              className="text-white transition-all duration-200 ease-in-out hover:bg-white/10 hover:shadow-sm"
              sx={{ textTransform: 'none' }}
            >
              Back
            </Button>
            <h1 className="ml-4 text-2xl font-bold text-white">
              Account Settings
            </h1>
          </div>

          <Grid container spacing={4}>
            {/* Profile Information */}
            <Grid item xs={12} md={4}>
              <Paper className="rounded-xl bg-[#181818] p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar
                      src={userData.photoURL}
                      alt={userData.name}
                      sx={{ width: 120, height: 120 }}
                    />
                    <div className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 hover:bg-blue-700">
                      <CameraIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <Typography variant="h6" className="mt-2 text-white">
                    {userData.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    {userData.email}
                  </Typography>
                  <Button
                    fullWidth
                    variant="outlined"
                    className="mt-4 border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
                  >
                    View Purchase History
                  </Button>
                </div>
              </Paper>
            </Grid>

            {/* Account Settings */}
            <Grid item xs={12} md={8}>
              <Paper className="rounded-xl bg-[#181818] p-6">
                <Typography variant="h6" className="mb-4 text-white">
                  Profile Details
                </Typography>
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <Button
                    variant="contained"
                    className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-2 text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl"
                    onClick={handleUpdateProfile}
                    sx={{
                      textTransform: 'none',
                      my: 1,
                    }}
                  >
                    Update Profile
                  </Button>
                </div>

                <Typography variant="h6" className="mb-4 mt-8 text-white">
                  Change Password
                </Typography>
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <Button
                    variant="contained"
                    className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-500 py-2 text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl"
                    onClick={handleUpdatePassword}
                    sx={{
                      textTransform: 'none',
                      my: 1,
                    }}
                  >
                    Update Password
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
