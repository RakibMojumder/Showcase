
const validation = {
    isValidOnlyCharacters: (data) => {
        return /^[A-Za-z ]+$/.test(data)
    },

    isValidEmail: (data) => {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data))
    },

    isValidPassword: (data) => {
        if (data.length >= 8 && data.length <= 15) {
            return true
        }
        return false
    },

    isValidImageType: (data) => {
        const reg = /image\/png|image\/jpeg|image\/jpg/;
        return reg.test(data)
    }
};

export default validation;