

export const startLoading = (state: any) => {
    state.loading = true;
    state.loaded = false;
  }
  
  export const doneLoading = (state: any) => {
    state.loading = false;
    state.loaded = true;
  }
  
  export const failedLoading = (state: any) => {
    state.loading = false;
    state.loaded = false;
  }
  
  export const startProcessing = (state: any) => {
    state.processing = true;
    state.processed = false;
  }
  
  export const doneProcessing = (state: any) => {
    state.processing = false;
    state.processed = true;
  }
  
  export const failedProcessing = (state: any) => {
    state.processing = false;
    state.processed = false;
  }
  
  
  