@echo off
echo Removing unused image directories...

rmdir /s /q "public\images\avatar\animal"
rmdir /s /q "public\images\avatar\emoji"
rmdir /s /q "public\images\avatar\festival"
rmdir /s /q "public\images\avatar\flat"
rmdir /s /q "public\images\avatar\handdrawing"
rmdir /s /q "public\images\avatar\minimal"
rmdir /s /q "public\images\avatar\paint"
rmdir /s /q "public\images\avatar\plain"
rmdir /s /q "public\images\avatar\popular"

echo Cleanup complete! You've removed 9 unused image directories.
echo This will significantly reduce your repository size. 