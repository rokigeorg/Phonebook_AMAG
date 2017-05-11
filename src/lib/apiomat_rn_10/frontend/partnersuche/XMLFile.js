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
    goog.provide('Apiomat.XMLFile');
    goog.require('Apiomat.AbstractClientDataModel');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.XMLFile = function() {
    this.init();
    /* referenced object methods */

};
/* static methods */

/**
 * Callback required by getXMLFiles function.
 * callback name getXMLFilesCallback
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
 * @param {getXMLFilesCallback} callback
 */
Apiomat.XMLFile.getXMLFiles = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.XMLFile, query, callback, false, usePersistentStorage);
};

/**
 * Callback required by getXMLFilesAndRefHref function.
 * callback name getXMLFilesAndRefHrefCallback
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
 * @param {getXMLFilesAndRefHrefCallback} callback which is called when request finished
 */
Apiomat.XMLFile.getXMLFilesAndRefHref = function(query, callback,withReferencedHrefs, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.XMLFile, query, callback, withReferencedHrefs, usePersistentStorage);
};

/**
 * Callback required by getXMLFilesCount function.
 * callback name getXMLFilesCountCallback
 * @param {function} onOk Function is called when everything is ok. (containing count as {number})
 * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/**
 * Returns count of objects of this class filtered by the given query from server
 * 
 * @param query a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
 * @param {getXMLFilesCountCallback} callback which is called when request finished
 */
Apiomat.XMLFile.getXMLFilesCount = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadCountFromServer(Apiomat.XMLFile, undefined, query, callback, usePersistentStorage);
};

/**
 * Deletes the classes that have been fetched with getXMLFiles() (or its async version) before
 *
 * Note: The SDK doesn't contain a query parser, so you need to pass the same query as in the fetch request.
 * Also, if you fetched objects from a class with different queries, the object doesn't get deleted
 *
 * @param {string} query 
 * @param {deleteAllFromStorageCallback} callback to be called after request is done
 */
Apiomat.XMLFile.deleteAllFromStorage = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(false, Apiomat.XMLFile, query, callback);
};

/**
 * Deletes the classes that have been fetched with getXMLFilesWithReferencedHref (or its async version) before
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
Apiomat.XMLFile.deleteAllFromStorageWithReferencedHrefs = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(true, Apiomat.XMLFile, query, callback);
};


/* inheritance */
Apiomat.XMLFile.prototype = new Apiomat.AbstractClientDataModel();
Apiomat.XMLFile.prototype.constructor = Apiomat.XMLFile;


Apiomat.XMLFile.prototype.init=function () {
        this.data = new Object();
}
/**
 * get simple name
 * @return {string} className
 */
Apiomat.XMLFile.prototype.getSimpleName = function() {
    return "XMLFile";
};
/**
 * get module name
 * @return {string} moduleName
 */
Apiomat.XMLFile.prototype.getModuleName = function() {
    return "Partnersuche";
};

/* easy getter and setter */

/**
 * Returns an URL of the file.
 
  * @return the URL of the file
 */
Apiomat.XMLFile.prototype.getXmlURL = function() 
{
    var url = this.data.xmlURL;
    if(!url)
    {
        return undefined;
    }
    url += ".img?apiKey=" + Apiomat.User.AOMAPIKEY + "&system=" + Apiomat.User.AOMSYS;
    return url;
}

/**
 * Callback required by loadXml function.
 * callback name loadXmlCountCallback
   * @param {function} onOk Function is called when everything is ok. (containing referenced object(s))
  * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/** 
 * Load referenced object(s) and
 * add result from server to member variable of this class.  * @return the ressource URL of the file
 */
Apiomat.XMLFile.prototype.loadXml = function(_callback, usePersistentStorage)
{
    var resUrl = this.getXmlURL();
    if (typeof resUrl == "undefined")
    {
        throw new Apiomat.ApiomatRequestError(
                        Apiomat.Status.ATTACHED_HREF_MISSING,200);
    }    
    return Apiomat.Datastore.getInstance().loadResource(resUrl, _callback, usePersistentStorage);
}

/**
 * Callback required by postXml functions.
 * callback name postXmlCallback
 * @param {function} onOk Function is called when everything is ok.
 * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/**
 * add a image
 * @param _data imagedata as bytearray
 * @param {postXmlCallback} _callback
 */
Apiomat.XMLFile.prototype.postXml = function(_data, _callback) 
{
    var postCB = {
            onOk : function(_imgHref) {
                if (_imgHref) {
                    this.parent.data.xmlURL = _imgHref;
                    /* update object again */
                    
                    var saveCB = {
                        onOk : function() {
                            Apiomat.Datastore.positiveCallback(_callback);
                        },
                        onError : function(error) {
                            var deleteCB = {
                                onOk : function() {
                                    Apiomat.Datastore.negativeCallback(_callback,error);
                                },
                                onError : function(e) {
                                    Apiomat.Datastore.negativeCallback(_callback,error);
                                }
                            };
                            Apiomat.Datastore.getInstance().deleteOnServer(_imgHref, deleteCB);
                            delete this.parent.parent.data.xmlURL;
                        }
                    }
                    saveCB.parent = this;
                    this.parent.save(saveCB);
                }
                else {
                    var error = new Apiomat.ApiomatRequestError(Apiomat.Status.HREF_NOT_FOUND);
                    if (_callback) {
                        Apiomat.Datastore.negativeCallback(_callback,error);
                    } else if(console && console.log) {
                        console.log("Error occured: " + error);
                    }
                }
            },
            onError : function(error) {
                Apiomat.Datastore.negativeCallback(_callback,error);
            }
    };
    postCB.parent = this;
    if(Apiomat.Datastore.getInstance().shouldSendOffline("POST"))
    {
        Apiomat.Datastore.getInstance( ).sendOffline( "POST", null, _data, false, postCB );
    }
    else
    {
        Apiomat.Datastore.getInstance().postStaticDataOnServer(_data, false, postCB);
    }
};

/**
 * Callback required by deleteXml functions.
 * callback name deleteXmlCallback
 * @param {function} onOk Function is called when everything is ok.
 * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/**
 * delete a image
 * @param {deleteXmlCallback} _callback
 */
Apiomat.XMLFile.prototype.deleteXml = function(_callback) 
{
    var imageHref = this.data.xmlURL;
	// First try to delete the attribute and then save, to find out if the caller is allowed to do so
    delete this.data.xmlURL;
    /* update object again and save deleted image reference in object */
    var saveCB= {
        onOk : function() {
            //save was successful, now call delete on server
            var deleteCB = {
                onOk : function() {
                    Apiomat.Datastore.positiveCallback(_callback);
                },
                onError : function(error) {
                    Apiomat.Datastore.negativeCallback(_callback,error);
                }
             };
             if(Apiomat.Datastore.getInstance().shouldSendOffline("DELETE"))
             {
                 Apiomat.Datastore.getInstance( ).sendOffline( "DELETE", imageHref, null, null, deleteCB );
             }
             else
             {
                 Apiomat.Datastore.getInstance().deleteOnServer(imageHref, deleteCB);
             }
        },
        onError : function(error) {
            //save was unsuccessful, reset data
            this.parent.data.xmlURL=imageHref;
        
           Apiomat.Datastore.negativeCallback(_callback,error);
           }
    };
	saveCB.parent=this;
    this.save(saveCB);
};


/**
 * get XmlName
 * @return XmlName
 */
Apiomat.XMLFile.prototype.getXmlName = function() 
{
            return this.data.xmlName !== null ? this.data.xmlName : undefined;
    
};

/**
 * set XmlName
 * @param XmlName
 */
Apiomat.XMLFile.prototype.setXmlName = function(_xmlName) {
    this.data.xmlName = _xmlName;
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);
