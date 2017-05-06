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
    goog.require('Apiomat.LDAPUser');
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
Apiomat.AMAGUser.prototype = new Apiomat.LDAPUser();
Apiomat.AMAGUser.prototype.constructor = Apiomat.AMAGUser;


Apiomat.AMAGUser.prototype.init=function () {
        Apiomat.LDAPUser.prototype.init.call(this);
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
 * get AddressCity
 * @return AddressCity
 */
Apiomat.AMAGUser.prototype.getAddressCity = function() 
{
            return this.data.addressCity !== null ? this.data.addressCity : undefined;
    
};

/**
 * set AddressCity
 * @param AddressCity
 */
Apiomat.AMAGUser.prototype.setAddressCity = function(_addressCity) {
    this.data.addressCity = _addressCity;
};


/**
 * get AddressStreet
 * @return AddressStreet
 */
Apiomat.AMAGUser.prototype.getAddressStreet = function() 
{
            return this.data.addressStreet !== null ? this.data.addressStreet : undefined;
    
};

/**
 * set AddressStreet
 * @param AddressStreet
 */
Apiomat.AMAGUser.prototype.setAddressStreet = function(_addressStreet) {
    this.data.addressStreet = _addressStreet;
};


/**
 * get AddressStreetNumber
 * @return AddressStreetNumber
 */
Apiomat.AMAGUser.prototype.getAddressStreetNumber = function() 
{
            return this.data.addressStreetNumber !== null ? this.data.addressStreetNumber : undefined;
    
};

/**
 * set AddressStreetNumber
 * @param AddressStreetNumber
 */
Apiomat.AMAGUser.prototype.setAddressStreetNumber = function(_addressStreetNumber) {
    this.data.addressStreetNumber = _addressStreetNumber;
};


/**
 * get AddressZipcode
 * @return AddressZipcode
 */
Apiomat.AMAGUser.prototype.getAddressZipcode = function() 
{
            return this.data.addressZipcode !== null ? this.data.addressZipcode : undefined;
    
};

/**
 * set AddressZipcode
 * @param AddressZipcode
 */
Apiomat.AMAGUser.prototype.setAddressZipcode = function(_addressZipcode) {
    this.data.addressZipcode = _addressZipcode;
};


/**
 * get Email
 * @return Email
 */
Apiomat.AMAGUser.prototype.getEmail = function() 
{
            return this.data.email !== null ? this.data.email : undefined;
    
};

/**
 * set Email
 * @param Email
 */
Apiomat.AMAGUser.prototype.setEmail = function(_email) {
    this.data.email = _email;
};


/**
 * get Language
 * @return Language
 */
Apiomat.AMAGUser.prototype.getLanguage = function() 
{
            return this.data.language !== null ? this.data.language : undefined;
    
};

/**
 * set Language
 * @param Language
 */
Apiomat.AMAGUser.prototype.setLanguage = function(_language) {
    this.data.language = _language;
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
 * get Organization
 * @return Organization
 */
Apiomat.AMAGUser.prototype.getOrganization = function() 
{
            return this.data.organization !== null ? this.data.organization : undefined;
    
};

/**
 * set Organization
 * @param Organization
 */
Apiomat.AMAGUser.prototype.setOrganization = function(_organization) {
    this.data.organization = _organization;
};


/**
 * get Telephone
 * @return Telephone
 */
Apiomat.AMAGUser.prototype.getTelephone = function() 
{
            return this.data.telephone !== null ? this.data.telephone : undefined;
    
};

/**
 * set Telephone
 * @param Telephone
 */
Apiomat.AMAGUser.prototype.setTelephone = function(_telephone) {
    this.data.telephone = _telephone;
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);
