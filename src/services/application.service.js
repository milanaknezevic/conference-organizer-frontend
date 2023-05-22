export const changeLanguage = (language) => {
  localStorage.setItem("language", language);
  window.location.reload();
};

const applicationService = {
  changeLanguage,
};

export default applicationService;
