export const SetupInterceptors = (apiClient) => {
    let isRefreshing = false;
    let refreshSubscribers = [];
  
    apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
  
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !localStorage.getItem("refreshTokenInProgress")
        ) {
          if (!isRefreshing) {
            isRefreshing = true;
            const refreshToken = localStorage.getItem("RefreshToken");
            localStorage.setItem("refreshTokenInProgress", "true");
            originalRequest._retry = true; // Mark the request as a retry
  
            try {
              const res = await apiClient.post(
                `/RefreshToken?refreshToken=${refreshToken}`,
                JSON.parse(localStorage.getItem("user"))
              );
  
              isRefreshing = false;
              localStorage.removeItem("refreshTokenInProgress");
  
              if (res.status === 200) {
                localStorage.setItem("token", res.data.Token.Token);
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("branchId", res.data.CurrentBranchId);
                localStorage.setItem("userBranchId", res.data.UserBranchId);
                localStorage.setItem("branchName", res.data.BRANCHName_En);
                localStorage.setItem("userId", res.data.UserId);
                localStorage.setItem("userName", res.data.Name);
                localStorage.setItem("RefreshToken", res.data.RefreshToken);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                originalRequest.headers['Authorization'] = 'Bearer ' + res.data.Token.Token;
  
                // Retry original request and resolve all subscribers
                const retryOriginalRequest = await apiClient(originalRequest);
                refreshSubscribers.forEach((callback) => callback(retryOriginalRequest));
                refreshSubscribers = []; // Clear the subscribers after retrying
  
                return retryOriginalRequest; // Return the retried request
              } else {
                logout();
              }
            } catch (refreshError) {
              logout();
              return Promise.reject(refreshError); // Reject the refresh token error
            }
          }
  
          return new Promise((resolve, reject) => {
            refreshSubscribers.push(() => {
              apiClient(originalRequest).then(resolve).catch(reject);
            });
          });
        }
  
        return Promise.reject(error);
      }
    );
  
    function logout() {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("branchId");
      localStorage.removeItem("userBranchId");
      localStorage.removeItem("branchName");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshTokenInProgress");
  
      // Redirect to the login page
      window.location.href = "/login";
    }
  };
  