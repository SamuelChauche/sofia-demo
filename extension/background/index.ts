// Demo background script — opens the side panel on extension icon click

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id })
  }
})

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'open_sidepanel') {
    const tabId = sender.tab?.id
    const windowId = sender.tab?.windowId
    if (tabId && windowId) {
      chrome.sidePanel.open({ tabId, windowId })
    }
  }
})

export {}
