export class LocalStorageService {

    setToken(tokenObj) {
        localStorage.setItem('access_token', tokenObj.api_token);
        localStorage.setItem('refresh_token', tokenObj.api_token);
        localStorage.setItem('userLogin', JSON.stringify(tokenObj));
    }
    updateInfo(tokenObj){
        localStorage.setItem('userLogin', JSON.stringify(tokenObj));
    }
    getAccessToken() {
        return localStorage.getItem('access_token');
    }
    getUserLogin() {
        return JSON.parse(localStorage.getItem('userLogin'));
    }
    clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userLogin');
    }
}
/*
const  = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        } return _service
    }
    function _setToken(tokenObj) {
        localStorage.setItem('access_token', tokenObj.api_token);
        localStorage.setItem('refresh_token', tokenObj.api_token);
    }
    function _getAccessToken() {
        return localStorage.getItem('access_token');
    }
    function _getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }
    function _clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    } return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken
    }
})(); export default LocalStorageService;
*/