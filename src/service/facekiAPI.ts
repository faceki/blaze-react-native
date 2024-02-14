import api from './axios';

// For More Details: docs.faceki.com

export const getAccessTokenFacekiAPI = async (
  clientId: string,
  clientSecret: string,
) => {
  // https://kycdocv2.faceki.com/api-integration/verification-apis/generate-token
  try {
    const response = await api.get(
      `/auth/api/access-token?clientId=${clientId}&clientSecret=${clientSecret}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const access_token = response?.data?.data?.access_token;
    // set the header token
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    return access_token;
  } catch (err) {
    console.log('getAccessTokenFacekiAPI', err);
    throw err;
  }
};

export const getWorkFlowRulesAPI = async (workflowId: any) => {
  try {
    const response = await api.get(`/api/v3/workflows/rules`, {
      params:{
        workflowId
      },
      headers: {
        Accept: 'application/json',
      },
    });

    return response?.data;
  } catch (err) {
    console.log('getKYCRulesAPI', err);
    throw err;
  }
};

export const submitKYCRequest = async (body: FormData) => {
  try {

    const response = await api.post(
      `/api/v3/kyc_verification`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response?.data;
  } catch (err) {
    const error = err as unknown as Error;
    console.log(error, error.name, error.message);
    throw err;
  }
};