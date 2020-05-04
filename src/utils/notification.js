export const useMessage = text => {
  if (window.M && text) window.M.toast({ html: text })
}
