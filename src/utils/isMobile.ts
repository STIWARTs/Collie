export const isMobile = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
};
