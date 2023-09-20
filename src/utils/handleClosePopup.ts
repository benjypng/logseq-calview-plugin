export const handleClosePopup = () => {
  //ESC
  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "Escape") {
        logseq.hideMainUI({ restoreEditingCursor: true });
      }
      e.stopPropagation();
    },
    false,
  );

  // Click
  document.addEventListener("click", (e) => {
    //@ts-ignore
    if (!(e.target as HTMLElement).closest(".calApp")) {
      logseq.hideMainUI({ restoreEditingCursor: true });
    }
    e.stopPropagation();
  });
};
