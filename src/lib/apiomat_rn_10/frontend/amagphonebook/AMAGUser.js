/*
 * Copyright (c) 2011 - 2017, Apinauten GmbH
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice, this 
 *    list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice, 
 *    this list of conditions and the following disclaimer in the documentation 
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * THIS FILE IS GENERATED AUTOMATICALLY. DON'T MODIFY IT.
 */
 
/* define namespace */

if(typeof goog !== 'undefined')
{
    goog.provide('Apiomat.AMAGUser');
    goog.require('Apiomat.User');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.AMAGUser = function(_username, _password) {
    this.init();
    if(typeof _username !== 'undefined')
    {
        this.setUserName(_username);
    }
    
    if(typeof _password !== 'undefined')
    {
        this.setPassword(_password);
    }
    /* referenced object methods */

};
/* static methods */

/**
 * Callback required by getAMAGUsers function.
 * callback name getAMAGUsersCallback
 * @param {function} onOk Function is called when everything is ok. (containing a list of object as {array})
 * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/**
 * Returns a list of objects of this class from server.
 * The size of the resultset is limited to an installation specific value ('maxResults') and defaults to 1000. 
 * Use limit and offset to return all results if the expected size is larger.
 *
 * If query is given then returned list will be filtered by the given query
 *
 * @param {string} query (optional) a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
 * @param {getAMAGUsersCallback} callback
 */
Apiomat.AMAGUser.getAMAGUsers = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.AMAGUser, query, callback, false, usePersistentStorage);
};

/**
 * Callback required by getAMAGUsersAndRefHref function.
 * callback name getAMAGUsersAndRefHrefCallback
 * @param {function} onOk Function is called when everything is ok. (containing a list of object as {array})
 * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/**
 * Returns a list of objects of this class from server.
 * The size of the resultset is limited to an installation specific value ('maxResults') and defaults to 1000. 
 * Use limit and offset to return all results if the expected size is larger.
 * If query is given then returned list will be filtered by the given query
 *
 * @param {string} query (optional) a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
 * @param {boolean} withReferencedHrefs set to true to get also all HREFs of referenced class instances
 * @param {getAMAGUsersAndRefHrefCallback} callback which is called when request finished
 */
Apiomat.AMAGUser.getAMAGUsersAndRefHref = function(query, callback,withReferencedHrefs, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.AMAGUser, query, callback, withReferencedHrefs, usePersistentStorage);
};

/**
 * Callback required by getAMAGUsersCount function.
 * callback name getAMAGUsersCountCallback
 * @param {function} onOk Function is called when everything is ok. (containing count as {number})
 * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/**
 * Returns count of objects of this class filtered by the given query from server
 * 
 * @param query a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
 * @param {getAMAGUsersCountCallback} callback which is called when request finished
 */
Apiomat.AMAGUser.getAMAGUsersCount = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadCountFromServer(Apiomat.AMAGUser, undefined, query, callback, usePersistentStorage);
};

/**
 * Deletes the classes that have been fetched with getAMAGUsers() (or its async version) before
 *
 * Note: The SDK doesn't contain a query parser, so you need to pass the same query as in the fetch request.
 * Also, if you fetched objects from a class with different queries, the object doesn't get deleted
 *
 * @param {string} query 
 * @param {deleteAllFromStorageCallback} callback to be called after request is done
 */
Apiomat.AMAGUser.deleteAllFromStorage = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(false, Apiomat.AMAGUser, query, callback);
};

/**
 * Deletes the classes that have been fetched with getAMAGUsersWithReferencedHref (or its async version) before
 *
 * Note:
 * - The SDK doesn't contain a query parser, so you need to pass the same query as in the fetch request.
 * - Also, if you fetched objects from a class with different queries, the object doesn't get deleted
 * - Lastly, if objects of this class were fetched in the context of loading a reference collection,
 *   those objects won't be deleted as well (use the respective delete..FromStorage method for that).
 *
 * @param {string} query 
 * @param {deleteAllFromStorageWithReferencedHrefsCallback} callback to be called after request is done
 */
Apiomat.AMAGUser.deleteAllFromStorageWithReferencedHrefs = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(true, Apiomat.AMAGUser, query, callback);
};


/* inheritance */
Apiomat.AMAGUser.prototype = new Apiomat.User();
Apiomat.AMAGUser.prototype.constructor = Apiomat.AMAGUser;


Apiomat.AMAGUser.prototype.init=function () {
        Apiomat.User.prototype.init.call(this);
    this.data["dynamicAttributes"] = {};
}
/**
 * get simple name
 * @return {string} className
 */
Apiomat.AMAGUser.prototype.getSimpleName = function() {
    return "AMAGUser";
};
/**
 * get module name
 * @return {string} moduleName
 */
Apiomat.AMAGUser.prototype.getModuleName = function() {
    return "AMAGPhonebook";
};

/* easy getter and setter */


/**
 * get FacsimileTelephoneNumber
 * @return FacsimileTelephoneNumber
 */
Apiomat.AMAGUser.prototype.getFacsimileTelephoneNumber = function() 
{
            return this.data.facsimileTelephoneNumber !== null ? this.data.facsimileTelephoneNumber : undefined;
    
};

/**
 * set FacsimileTelephoneNumber
 * @param FacsimileTelephoneNumber
 */
Apiomat.AMAGUser.prototype.setFacsimileTelephoneNumber = function(_facsimileTelephoneNumber) {
    this.data.facsimileTelephoneNumber = _facsimileTelephoneNumber;
};


/**
 * get GivenName
 * @return GivenName
 */
Apiomat.AMAGUser.prototype.getGivenName = function() 
{
            return this.data.givenName !== null ? this.data.givenName : undefined;
    
};

/**
 * set GivenName
 * @param GivenName
 */
Apiomat.AMAGUser.prototype.setGivenName = function(_givenName) {
    this.data.givenName = _givenName;
};


/**
 * get ImCompanyCode
 * @return ImCompanyCode
 */
Apiomat.AMAGUser.prototype.getImCompanyCode = function() 
{
            return this.data.imCompanyCode !== null ? this.data.imCompanyCode : undefined;
    
};

/**
 * set ImCompanyCode
 * @param ImCompanyCode
 */
Apiomat.AMAGUser.prototype.setImCompanyCode = function(_imCompanyCode) {
    this.data.imCompanyCode = _imCompanyCode;
};


/**
 * get ImGender
 * @return ImGender
 */
Apiomat.AMAGUser.prototype.getImGender = function() 
{
            return this.data.imGender !== null ? this.data.imGender : undefined;
    
};

/**
 * set ImGender
 * @param ImGender
 */
Apiomat.AMAGUser.prototype.setImGender = function(_imGender) {
    this.data.imGender = _imGender;
};


/**
 * get ImHomeTown
 * @return ImHomeTown
 */
Apiomat.AMAGUser.prototype.getImHomeTown = function() 
{
            return this.data.imHomeTown !== null ? this.data.imHomeTown : undefined;
    
};

/**
 * set ImHomeTown
 * @param ImHomeTown
 */
Apiomat.AMAGUser.prototype.setImHomeTown = function(_imHomeTown) {
    this.data.imHomeTown = _imHomeTown;
};


/**
 * get ImIndividualAreaName
 * @return ImIndividualAreaName
 */
Apiomat.AMAGUser.prototype.getImIndividualAreaName = function() 
{
            return this.data.imIndividualAreaName !== null ? this.data.imIndividualAreaName : undefined;
    
};

/**
 * set ImIndividualAreaName
 * @param ImIndividualAreaName
 */
Apiomat.AMAGUser.prototype.setImIndividualAreaName = function(_imIndividualAreaName) {
    this.data.imIndividualAreaName = _imIndividualAreaName;
};


/**
 * get ImLanguage
 * @return ImLanguage
 */
Apiomat.AMAGUser.prototype.getImLanguage = function() 
{
            return this.data.imLanguage !== null ? this.data.imLanguage : undefined;
    
};

/**
 * set ImLanguage
 * @param ImLanguage
 */
Apiomat.AMAGUser.prototype.setImLanguage = function(_imLanguage) {
    this.data.imLanguage = _imLanguage;
};


/**
 * get ImLanguageDescription
 * @return ImLanguageDescription
 */
Apiomat.AMAGUser.prototype.getImLanguageDescription = function() 
{
            return this.data.imLanguageDescription !== null ? this.data.imLanguageDescription : undefined;
    
};

/**
 * set ImLanguageDescription
 * @param ImLanguageDescription
 */
Apiomat.AMAGUser.prototype.setImLanguageDescription = function(_imLanguageDescription) {
    this.data.imLanguageDescription = _imLanguageDescription;
};


/**
 * get ImPersonalAreaCode
 * @return ImPersonalAreaCode
 */
Apiomat.AMAGUser.prototype.getImPersonalAreaCode = function() 
{
            return this.data.imPersonalAreaCode !== null ? this.data.imPersonalAreaCode : undefined;
    
};

/**
 * set ImPersonalAreaCode
 * @param ImPersonalAreaCode
 */
Apiomat.AMAGUser.prototype.setImPersonalAreaCode = function(_imPersonalAreaCode) {
    this.data.imPersonalAreaCode = _imPersonalAreaCode;
};


/**
 * get ImPersonalAreaName
 * @return ImPersonalAreaName
 */
Apiomat.AMAGUser.prototype.getImPersonalAreaName = function() 
{
            return this.data.imPersonalAreaName !== null ? this.data.imPersonalAreaName : undefined;
    
};

/**
 * set ImPersonalAreaName
 * @param ImPersonalAreaName
 */
Apiomat.AMAGUser.prototype.setImPersonalAreaName = function(_imPersonalAreaName) {
    this.data.imPersonalAreaName = _imPersonalAreaName;
};


/**
 * get ImWorkCity
 * @return ImWorkCity
 */
Apiomat.AMAGUser.prototype.getImWorkCity = function() 
{
            return this.data.imWorkCity !== null ? this.data.imWorkCity : undefined;
    
};

/**
 * set ImWorkCity
 * @param ImWorkCity
 */
Apiomat.AMAGUser.prototype.setImWorkCity = function(_imWorkCity) {
    this.data.imWorkCity = _imWorkCity;
};


/**
 * get Mail
 * @return Mail
 */
Apiomat.AMAGUser.prototype.getMail = function() 
{
            return this.data.mail !== null ? this.data.mail : undefined;
    
};

/**
 * set Mail
 * @param Mail
 */
Apiomat.AMAGUser.prototype.setMail = function(_mail) {
    this.data.mail = _mail;
};


/**
 * get Mobile
 * @return Mobile
 */
Apiomat.AMAGUser.prototype.getMobile = function() 
{
            return this.data.mobile !== null ? this.data.mobile : undefined;
    
};

/**
 * set Mobile
 * @param Mobile
 */
Apiomat.AMAGUser.prototype.setMobile = function(_mobile) {
    this.data.mobile = _mobile;
};


/**
 * get Sn
 * @return Sn
 */
Apiomat.AMAGUser.prototype.getSn = function() 
{
            return this.data.sn !== null ? this.data.sn : undefined;
    
};

/**
 * set Sn
 * @param Sn
 */
Apiomat.AMAGUser.prototype.setSn = function(_sn) {
    this.data.sn = _sn;
};


/**
 * get TelephoneNumber
 * @return TelephoneNumber
 */
Apiomat.AMAGUser.prototype.getTelephoneNumber = function() 
{
            return this.data.telephoneNumber !== null ? this.data.telephoneNumber : undefined;
    
};

/**
 * set TelephoneNumber
 * @param TelephoneNumber
 */
Apiomat.AMAGUser.prototype.setTelephoneNumber = function(_telephoneNumber) {
    this.data.telephoneNumber = _telephoneNumber;
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);
