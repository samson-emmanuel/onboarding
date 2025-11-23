async function login(email, password) {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const url = `${baseUrl}/Auth/login`;
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email, password });
    console.log('Login payload:', body);

    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        console.log('Login response status:', response.status);
        if (response.status === 200) {
            const apiResponse = await response.json();
            if (apiResponse.isSuccessful) {
                localStorage.setItem('authToken', apiResponse.result.token);
                localStorage.setItem('user', JSON.stringify(apiResponse.result.user));
            }
            return apiResponse;
        } else {
            throw new Error(`Failed to login: ${response.status}. ${await response.text()}`);
        }
    } catch (e) {
        throw new Error(`Network error during login: ${e.message}`);
    }
}


async function forgotPassword(email) {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const url = `${baseUrl}/Auth/forgot-password`;
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email });
    console.log('Forgot password payload:', body);

    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        if (response.status !== 200) {
            throw new Error(`Failed to send password reset email: ${response.status}. ${await response.text()}`);
        }
        return await response.json();
    } catch (e) {
        throw new Error(`Network error during forgot password request: ${e.message}`);
    }
}



async function resetPassword(email, password, token) {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const url = `${baseUrl}/Auth/reset-password`;
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email, password, token });
    console.log('Reset password payload:', body);

    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        if (response.status !== 200) {
            throw new Error(`Failed to reset password: ${response.status}. ${await response.text()}`);
        }
        return await response.json();
    } catch (e) {
        throw new Error(`Network error during reset password request: ${e.message}`);
    }
}



async function getLocalHireInfo() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Content/get-local-hire-info`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        console.log('Get Local Hire Info response status:', response.status);
        if (response.status === 200) {
            const jsonResponse = await response.json();
            if (jsonResponse.isSuccessful && jsonResponse.result) {
                const localHireInfo = jsonResponse.result; // Assume direct object, no fromJson needed in JS
                return localHireInfo;
            } else {
                throw new Error(`Failed to load local hire info: ${jsonResponse.message}`);
            }
        } else {
            throw new Error(`Failed to load local hire info: ${response.status}. ${await response.text()}`);
        }
    } catch (e) {
        throw new Error(`Network error fetching local hire info: ${e.message}`);
    }
}



async function getLocalContacts() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Contacts/get-local`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        console.log('Get Local Contacts response status:', response.status);
        if (response.status === 200) {
            const jsonResponse = await response.json();
            if (jsonResponse.isSuccessful && Array.isArray(jsonResponse.result)) {
                const localContacts = jsonResponse.result; // Assume array of objects
                return localContacts;
            } else {
                throw new Error(`Failed to load local contacts: ${jsonResponse.message}`);
            }
        } else {
            throw new Error(`Failed to load local contacts: ${response.status}. ${await response.text()}`);
        }
    } catch (e) {
        throw new Error(`Network error fetching local contacts: ${e.message}`);
    }
}


async function getWelcomeMessages() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Content/get-welcome-messages`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        console.log('Get Welcome Messages response status:', response.status);
        if (response.status === 200) {
            const jsonResponse = await response.json();
            if (jsonResponse.isSuccessful && jsonResponse.result) {
                const welcomeMessages = jsonResponse.result; // Assume object
                return welcomeMessages;
            } else {
                throw new Error(`Failed to load welcome messages: ${jsonResponse.message}`);
            }
        } else {
            throw new Error(`Failed to load welcome messages: ${response.status}. ${await response.text()}`);
        }
    } catch (e) {
        throw new Error(`Network error fetching welcome messages: ${e.message}`);
    }
}

async function getCEOImage() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Gallery/get-ceo-images`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        if (response.status === 200) {
            const data = await response.json();
            const image = data.result[0]?.imageBase64;
            return image;
        } else {
            throw new Error('Failed to load CEO image');
        }
    } catch (e) {
        throw new Error(`Failed to load CEO image: ${e.message}`);
    }
}


async function getHRImage() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Gallery/get-hr-images`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        if (response.status === 200) {
            const data = await response.json();
            const image = data.result[0]?.imageBase64;
            return image;
        } else {
            throw new Error('Failed to load HR image');
        }
    } catch (e) {
        throw new Error(`Failed to load HR image: ${e.message}`);
    }
}


async function getEtiquette() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Content/get-etiquette`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        console.log('Get Etiquette response status:', response.status);
        if (response.status === 200) {
            const jsonResponse = await response.json();
            if (jsonResponse.isSuccessful && jsonResponse.result) {
                const etiquette = jsonResponse.result; // Assume object
                return etiquette;
            } else {
                throw new Error(`Failed to load etiquette: ${jsonResponse.message}`);
            }
        } else {
            throw new Error(`Failed to load etiquette: ${response.status}. ${await response.text()}`);
        }
    } catch (e) {
        throw new Error(`Network error fetching etiquette: ${e.message}`);
    }
}



async function getGeneralGallery() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Gallery/get-general`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        console.log('Get General Gallery response status:', response.status);
        if (response.status === 200) {
            const jsonResponse = await response.json();
            if (jsonResponse.isSuccessful && Array.isArray(jsonResponse.result)) {
                const gallery = jsonResponse.result;
                return gallery;
            } else {
                throw new Error(`Failed to load general gallery: ${jsonResponse.message}`);
            }
        } else if (response.status === 404) {
            return [];
        } else {
            throw new Error(`Failed to load general gallery: ${response.status}. ${await response.text()}`);
        }
    } catch (e) {
        throw new Error(`Network error fetching general gallery: ${e.message}`);
    }
}



async function getAllContacts() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Contacts/get-all`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
    console.log('Get All Contacts request headers:', headers);

    try {
        const response = await fetch(url, { headers });
        console.log('Get All Contacts response status:', response.status);
        const jsonResponse = await response.json();
        if (jsonResponse.isSuccessful && jsonResponse.result) {
            const allContacts = jsonResponse.result; // Assume object
            return allContacts;
        } else {
            console.log('Failed to load all contacts:', jsonResponse.Message || 'Unknown error');
            return {}; // Empty object
        }
    } catch (e) {
        console.log('Network error fetching all contacts:', e);
        return {}; // Empty object
    }
}




async function getOnboardingPlan() {
    const baseUrl = 'https://onboardingservice-812204315267.europe-west1.run.app/api';
    const token = localStorage.getItem('authToken');
    const url = `${baseUrl}/Content/get-onboarding-plan`;
    const headers = {
        'accept': 'text/plain',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(url, { headers });
        console.log('Get Onboarding Plan response status:', response.status);
        if (response.status === 200) {
            const jsonResponse = await response.json();
            if (jsonResponse.isSuccessful && jsonResponse.result) {
                const onboardingPlan = jsonResponse.result; // Assume object
                return onboardingPlan;
            } else {
                throw new Error(`Failed to load onboarding plan: ${jsonResponse.message}`);
            }
        } else {
            throw new Error(`Failed to load onboarding plan: ${response.status}. ${await response.text()}`);
        }
    } catch (e) {
        throw new Error(`Network error fetching onboarding plan: ${e.message}`);
    }
}