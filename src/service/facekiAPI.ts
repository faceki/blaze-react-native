import api from './axios';

// more pages in this api

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

export const getKYCRulesAPI = async () => {
  // https://kycdocv2.faceki.com/api-integration/verification-apis/get-kyc-rules
  try {
    const response = await api.get(`/kycrules/api/kycrules`, {
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

export const postMultiKYCVerificationAPI = async (body: FormData) => {
  try {

    const response = await api.post(
      `/kycverify/api/kycverify/multi-kyc-verification`,
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

export const postSingleKYCVerificationAPI = async (body: FormData) => {
  try {

    const response = await api.post(
      `/kycverify/api/kycverify/kyc-verification`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response?.data;
  } catch (err) {
    console.log(err)
    const error = err as unknown as Error;
    console.log(error, error.name, error.message);
    throw err;
  }
};


export const getWorkFlowRulesAPI = async (workflowId: any) => {
  // https://kycdocv2.faceki.com/api-integration/verification-apis/get-kyc-rules
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