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
    goog.provide('Apiomat.Adressdaten');
    goog.require('Apiomat.AbstractClientDataModel');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.Adressdaten = function() {
    this.init();
    /* referenced object methods */
    
    var oeffnungszeiten = undefined;
    
    /**
     * Getter for local linked variable
     * @return {string} attributeName 
     */
    this.getOeffnungszeiten = function() 
    {
           return this.oeffnungszeiten !== null? this.oeffnungszeiten : undefined;
     
    };
	
    /**
     * Callback required by loadOeffnungszeiten function.
     * callback name loadOeffnungszeitenCallback
	      * @param {function} onOk Function is called when everything is ok. (containing referenced object as {object})
	      * @param {function} onError Function is called when an error occurs. (containing the error object) 
     */
    
    /** 
     * Load referenced object(s) and
     * add result from server to member variable of this class.
	 * @param {loadOeffnungszeitenCallback} callback
	 */
    this.loadOeffnungszeiten = function(callback, usePersistentStorage) 
    {
        var refUrl = this.data.oeffnungszeitenHref;
        if (typeof refUrl == "undefined")
        {
            throw new Apiomat.ApiomatRequestError(Apiomat.Status.ATTACHED_HREF_MISSING,200);
        }    
        var loadFromServerCB={
            onOk : function(obj, meta) {
                				this.parent.oeffnungszeiten = obj;
                                Apiomat.Datastore.positiveCallback(callback,obj);
            },
            onError : function(error) {
                if (error.statusCode==204) {
                    this.parent.oeffnungszeiten = null;
                }
				Apiomat.Datastore.negativeCallback(callback,error);
            }
        };
        loadFromServerCB.parent=this;
        Apiomat.Datastore.getInstance().loadFromServer(refUrl,loadFromServerCB, undefined,false, undefined, Apiomat.Oeffnungszeiten, false, usePersistentStorage);
    };
	
    /**
     * Callback required by loadOeffnungszeitenAndRefHref function.
     * callback name loadOeffnungszeitenAndRefHrefCallback
          * @param {function} onOk Function is called when everything is ok. (containing referenced objects with refHref as {object})
     	 * @param {function} onError Function is called when an error occurs. (containing the error object) 
     */
    
    /** 
     * Load referenced object(s) with refHref and
     * add result from server to member variable of this class.
	 * @param {loadOeffnungszeitenAndRefHrefCallback} callback
     */
    this.loadOeffnungszeitenAndRefHref = function(callback, usePersistentStorage)
    {
        var refUrl = this.data.oeffnungszeitenHref;
        if (typeof refUrl == "undefined")
        {
            throw new Apiomat.ApiomatRequestError(Apiomat.Status.ATTACHED_HREF_MISSING,200);
        }
        
        var loadFromServerCB={
            onOk : function(obj) {
                					this.parent.oeffnungszeiten = obj;
                				Apiomat.Datastore.positiveCallback(callback,obj);
            },
            onError : function(error) {
                Apiomat.Datastore.negativeCallback(callback,error);
            }
        }
        loadFromServerCB.parent=this;
        Apiomat.Datastore.getInstance().loadFromServer(refUrl,loadFromServerCB , undefined,true, undefined, Apiomat.Oeffnungszeiten, false, usePersistentStorage);
    };
    
    /**
     * Callback required by postOeffnungszeiten function.
     * callback name postOeffnungszeitenCallback
     * @param {function} onOk Function is called when everything is ok. (containing refHref as {string})
     * @param {function} onError Function is called when an error occurs. (containing the error object) 
     */
	
    /**
     * Adds a given reference to this object
	 * @param _refData reference
	 * @param {postOeffnungszeitenCallback} _callback
     */
    this.postOeffnungszeiten = function(_refData, _callback, usePersistentStorage) 
    {
        if(_refData == false || typeof _refData.getHref() === 'undefined') {
            var error = new Apiomat.ApiomatRequestError(Apiomat.Status.SAVE_REFERENECE_BEFORE_REFERENCING);
            if (_callback) {
                    Apiomat.Datastore.negativeCallback(_callback,error);
            } else if(console && console.log) {
                    console.log("Error occured: " + error);
            }
            return;
        }
        
        var callback = {
            onOk : function(refHref) {
                if (refHref) {
                                     this.parent.oeffnungszeiten = _refData;
                                }
                Apiomat.Datastore.positiveCallback(_callback,refHref);
            },
            onError : function(error) {
                Apiomat.Datastore.negativeCallback(_callback,error);
            }
        };
        callback.parent=this;
        if(Apiomat.Datastore.getInstance().shouldSendOffline("POST"))
        {
            Apiomat.Datastore.getInstance( ).sendOffline( "POST", this.getHref(), _refData, "oeffnungszeiten", callback );
        }
        else
        {
            Apiomat.Datastore.getInstance().postOnServer(_refData, callback, this.data.oeffnungszeitenHref, usePersistentStorage);
        }
    };
	
    /**
     * Callback required by removeOeffnungszeiten function.
     * callback name removeOeffnungszeitenCallback
     * @param {function} onOk Function is called when everything is ok.
     * @param {function} onError Function is called when an error occurs. (containing the error object) 
     */
    
    /**
     * remove a given reference to this object
	 * @param _refData reference
	 * @param {removeOeffnungszeitenCallback} _callback
     */
    this.removeOeffnungszeiten = function(_refData, _callback, usePersistentStorage) 
    {
        var id = _refData.getHref().substring(_refData.getHref().lastIndexOf("/") + 1);
        var deleteHref = this.data.oeffnungszeitenHref + "/" + id;
        var callback = {
            onOk : function(obj) {
                             this.parent.oeffnungszeiten = undefined
            ;                 
                Apiomat.Datastore.positiveCallback(_callback);
            },
            onError : function(error) {
                Apiomat.Datastore.negativeCallback(_callback,error);
            }
        };
        callback.parent=this;
        Apiomat.Datastore.getInstance().deleteOnServer(deleteHref, callback, usePersistentStorage);
    };
    
    
};
/* static methods */

/**
 * Callback required by getAdressdatens function.
 * callback name getAdressdatensCallback
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
 * @param {getAdressdatensCallback} callback
 */
Apiomat.Adressdaten.getAdressdatens = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.Adressdaten, query, callback, false, usePersistentStorage);
};

/**
 * Callback required by getAdressdatensAndRefHref function.
 * callback name getAdressdatensAndRefHrefCallback
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
 * @param {getAdressdatensAndRefHrefCallback} callback which is called when request finished
 */
Apiomat.Adressdaten.getAdressdatensAndRefHref = function(query, callback,withReferencedHrefs, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.Adressdaten, query, callback, withReferencedHrefs, usePersistentStorage);
};

/**
 * Callback required by getAdressdatensCount function.
 * callback name getAdressdatensCountCallback
 * @param {function} onOk Function is called when everything is ok. (containing count as {number})
 * @param {function} onError Function is called when an error occurs. (containing the error object) 
 */

/**
 * Returns count of objects of this class filtered by the given query from server
 * 
 * @param query a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
 * @param {getAdressdatensCountCallback} callback which is called when request finished
 */
Apiomat.Adressdaten.getAdressdatensCount = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadCountFromServer(Apiomat.Adressdaten, undefined, query, callback, usePersistentStorage);
};

/**
 * Deletes the classes that have been fetched with getAdressdatens() (or its async version) before
 *
 * Note: The SDK doesn't contain a query parser, so you need to pass the same query as in the fetch request.
 * Also, if you fetched objects from a class with different queries, the object doesn't get deleted
 *
 * @param {string} query 
 * @param {deleteAllFromStorageCallback} callback to be called after request is done
 */
Apiomat.Adressdaten.deleteAllFromStorage = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(false, Apiomat.Adressdaten, query, callback);
};

/**
 * Deletes the classes that have been fetched with getAdressdatensWithReferencedHref (or its async version) before
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
Apiomat.Adressdaten.deleteAllFromStorageWithReferencedHrefs = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(true, Apiomat.Adressdaten, query, callback);
};


/* inheritance */
Apiomat.Adressdaten.prototype = new Apiomat.AbstractClientDataModel();
Apiomat.Adressdaten.prototype.constructor = Apiomat.Adressdaten;


Apiomat.Adressdaten.prototype.init=function () {
        this.data = new Object();
    this.oeffnungszeiten = undefined;
}
/**
 * get simple name
 * @return {string} className
 */
Apiomat.Adressdaten.prototype.getSimpleName = function() {
    return "Adressdaten";
};
/**
 * get module name
 * @return {string} moduleName
 */
Apiomat.Adressdaten.prototype.getModuleName = function() {
    return "Partnersuche";
};

/* easy getter and setter */


/**
 * get Auslieferungswerk
 * @return Auslieferungswerk
 */
Apiomat.Adressdaten.prototype.getAuslieferungswerk = function() 
{
            return this.data.auslieferungswerk !== null ? this.data.auslieferungswerk : undefined;
    
};

/**
 * set Auslieferungswerk
 * @param Auslieferungswerk
 */
Apiomat.Adressdaten.prototype.setAuslieferungswerk = function(_auslieferungswerk) {
    this.data.auslieferungswerk = _auslieferungswerk;
};


/**
 * get Bemerkung
 * @return Bemerkung
 */
Apiomat.Adressdaten.prototype.getBemerkung = function() 
{
            return this.data.bemerkung !== null ? this.data.bemerkung : undefined;
    
};

/**
 * set Bemerkung
 * @param Bemerkung
 */
Apiomat.Adressdaten.prototype.setBemerkung = function(_bemerkung) {
    this.data.bemerkung = _bemerkung;
};


/**
 * get DistanceToQueryCoordinatesInKM
 * @return DistanceToQueryCoordinatesInKM
 */
Apiomat.Adressdaten.prototype.getDistanceToQueryCoordinatesInKM = function() 
{
            return this.data.distanceToQueryCoordinatesInKM !== null ? this.data.distanceToQueryCoordinatesInKM : undefined;
    
};

/**
 * set DistanceToQueryCoordinatesInKM
 * @param DistanceToQueryCoordinatesInKM
 */
Apiomat.Adressdaten.prototype.setDistanceToQueryCoordinatesInKM = function(_distanceToQueryCoordinatesInKM) {
    this.data.distanceToQueryCoordinatesInKM = _distanceToQueryCoordinatesInKM;
};


/**
 * get Handelsregisternummer
 * @return Handelsregisternummer
 */
Apiomat.Adressdaten.prototype.getHandelsregisternummer = function() 
{
            return this.data.handelsregisternummer !== null ? this.data.handelsregisternummer : undefined;
    
};

/**
 * set Handelsregisternummer
 * @param Handelsregisternummer
 */
Apiomat.Adressdaten.prototype.setHandelsregisternummer = function(_handelsregisternummer) {
    this.data.handelsregisternummer = _handelsregisternummer;
};


/**
 * get Kontengruppe
 * @return Kontengruppe
 */
Apiomat.Adressdaten.prototype.getKontengruppe = function() 
{
            return this.data.kontengruppe !== null ? this.data.kontengruppe : undefined;
    
};

/**
 * set Kontengruppe
 * @param Kontengruppe
 */
Apiomat.Adressdaten.prototype.setKontengruppe = function(_kontengruppe) {
    this.data.kontengruppe = _kontengruppe;
};


/**
 * get KundenNr
 * @return KundenNr
 */
Apiomat.Adressdaten.prototype.getKundenNr = function() 
{
            return this.data.kundenNr !== null ? this.data.kundenNr : undefined;
    
};

/**
 * set KundenNr
 * @param KundenNr
 */
Apiomat.Adressdaten.prototype.setKundenNr = function(_kundenNr) {
    this.data.kundenNr = _kundenNr;
};


/**
 * get Kundentyp
 * @return Kundentyp
 */
Apiomat.Adressdaten.prototype.getKundentyp = function() 
{
            return this.data.kundentyp !== null ? this.data.kundentyp : undefined;
    
};

/**
 * set Kundentyp
 * @param Kundentyp
 */
Apiomat.Adressdaten.prototype.setKundentyp = function(_kundentyp) {
    this.data.kundentyp = _kundentyp;
};


/**
 * get Land
 * @return Land
 */
Apiomat.Adressdaten.prototype.getLand = function() 
{
            return this.data.land !== null ? this.data.land : undefined;
    
};

/**
 * set Land
 * @param Land
 */
Apiomat.Adressdaten.prototype.setLand = function(_land) {
    this.data.land = _land;
};


/**
 * get Location latitude
 * @return latitude as {floating number}
 */
Apiomat.Adressdaten.prototype.getLocationLatitude = function() 
{
    var locArr = this.data.location;
    if(locArr)
    {
        return locArr[0];
    }
};

/**
 * get Location longitude
 * @return longitude as {floating number}
 */
Apiomat.Adressdaten.prototype.getLocationLongitude = function() 
{
    var locArr = this.data.location;
    if(locArr)
    {
        return locArr[1];
    }
};

/**
 * set latitude
 * @param latitude
 */
Apiomat.Adressdaten.prototype.setLocationLatitude = function(_latitude) 
{
    var locArr = this.data.location;
    if(!locArr)
    {
        locArr = [_latitude, undefined];
    }
    else
    {
        locArr[0] = _latitude;
    }
    this.data.location = locArr;
};

/**
 * set longitude
 * @param longitude
 */
Apiomat.Adressdaten.prototype.setLocationLongitude = function(_longitude) 
{
    var locArr = this.data.location;
    if(!locArr)
    {
        locArr = [0, _longitude];
    }
    else
    {
        locArr[1] = _longitude;
    }
    this.data.location = locArr;
};


/**
 * get Name1
 * @return Name1
 */
Apiomat.Adressdaten.prototype.getName1 = function() 
{
            return this.data.name1 !== null ? this.data.name1 : undefined;
    
};

/**
 * set Name1
 * @param Name1
 */
Apiomat.Adressdaten.prototype.setName1 = function(_name1) {
    this.data.name1 = _name1;
};


/**
 * get Name2
 * @return Name2
 */
Apiomat.Adressdaten.prototype.getName2 = function() 
{
            return this.data.name2 !== null ? this.data.name2 : undefined;
    
};

/**
 * set Name2
 * @param Name2
 */
Apiomat.Adressdaten.prototype.setName2 = function(_name2) {
    this.data.name2 = _name2;
};


/**
 * get Name3
 * @return Name3
 */
Apiomat.Adressdaten.prototype.getName3 = function() 
{
            return this.data.name3 !== null ? this.data.name3 : undefined;
    
};

/**
 * set Name3
 * @param Name3
 */
Apiomat.Adressdaten.prototype.setName3 = function(_name3) {
    this.data.name3 = _name3;
};


/**
 * get Name4
 * @return Name4
 */
Apiomat.Adressdaten.prototype.getName4 = function() 
{
            return this.data.name4 !== null ? this.data.name4 : undefined;
    
};

/**
 * set Name4
 * @param Name4
 */
Apiomat.Adressdaten.prototype.setName4 = function(_name4) {
    this.data.name4 = _name4;
};


/**
 * get Oeffnungszeiten
 * @return Oeffnungszeiten
 */
Apiomat.Adressdaten.prototype.getOeffnungszeiten = function() 
{
            return this.data.oeffnungszeiten !== null ? this.data.oeffnungszeiten : undefined;
    
};

/**
 * set Oeffnungszeiten
 * @param Oeffnungszeiten
 */
Apiomat.Adressdaten.prototype.setOeffnungszeiten = function(_oeffnungszeiten) {
    this.data.oeffnungszeiten = _oeffnungszeiten;
};


/**
 * get Ort
 * @return Ort
 */
Apiomat.Adressdaten.prototype.getOrt = function() 
{
            return this.data.ort !== null ? this.data.ort : undefined;
    
};

/**
 * set Ort
 * @param Ort
 */
Apiomat.Adressdaten.prototype.setOrt = function(_ort) {
    this.data.ort = _ort;
};


/**
 * get Plz
 * @return Plz
 */
Apiomat.Adressdaten.prototype.getPlz = function() 
{
            return this.data.plz !== null ? this.data.plz : undefined;
    
};

/**
 * set Plz
 * @param Plz
 */
Apiomat.Adressdaten.prototype.setPlz = function(_plz) {
    this.data.plz = _plz;
};


/**
 * get Postfach
 * @return Postfach
 */
Apiomat.Adressdaten.prototype.getPostfach = function() 
{
            return this.data.postfach !== null ? this.data.postfach : undefined;
    
};

/**
 * set Postfach
 * @param Postfach
 */
Apiomat.Adressdaten.prototype.setPostfach = function(_postfach) {
    this.data.postfach = _postfach;
};


/**
 * get PostfachOrt
 * @return PostfachOrt
 */
Apiomat.Adressdaten.prototype.getPostfachOrt = function() 
{
            return this.data.postfachOrt !== null ? this.data.postfachOrt : undefined;
    
};

/**
 * set PostfachOrt
 * @param PostfachOrt
 */
Apiomat.Adressdaten.prototype.setPostfachOrt = function(_postfachOrt) {
    this.data.postfachOrt = _postfachOrt;
};


/**
 * get PostfachPlz
 * @return PostfachPlz
 */
Apiomat.Adressdaten.prototype.getPostfachPlz = function() 
{
            return this.data.postfachPlz !== null ? this.data.postfachPlz : undefined;
    
};

/**
 * set PostfachPlz
 * @param PostfachPlz
 */
Apiomat.Adressdaten.prototype.setPostfachPlz = function(_postfachPlz) {
    this.data.postfachPlz = _postfachPlz;
};


/**
 * get Region
 * @return Region
 */
Apiomat.Adressdaten.prototype.getRegion = function() 
{
            return this.data.region !== null ? this.data.region : undefined;
    
};

/**
 * set Region
 * @param Region
 */
Apiomat.Adressdaten.prototype.setRegion = function(_region) {
    this.data.region = _region;
};


/**
 * get Regionalzonen
 * @return Regionalzonen
 */
Apiomat.Adressdaten.prototype.getRegionalzonen = function() 
{
            return this.data.regionalzonen !== null ? this.data.regionalzonen : undefined;
    
};

/**
 * set Regionalzonen
 * @param Regionalzonen
 */
Apiomat.Adressdaten.prototype.setRegionalzonen = function(_regionalzonen) {
    this.data.regionalzonen = _regionalzonen;
};


/**
 * get Sprache
 * @return Sprache
 */
Apiomat.Adressdaten.prototype.getSprache = function() 
{
            return this.data.sprache !== null ? this.data.sprache : undefined;
    
};

/**
 * set Sprache
 * @param Sprache
 */
Apiomat.Adressdaten.prototype.setSprache = function(_sprache) {
    this.data.sprache = _sprache;
};


/**
 * get StrasseHausnummer
 * @return StrasseHausnummer
 */
Apiomat.Adressdaten.prototype.getStrasseHausnummer = function() 
{
            return this.data.strasseHausnummer !== null ? this.data.strasseHausnummer : undefined;
    
};

/**
 * set StrasseHausnummer
 * @param StrasseHausnummer
 */
Apiomat.Adressdaten.prototype.setStrasseHausnummer = function(_strasseHausnummer) {
    this.data.strasseHausnummer = _strasseHausnummer;
};


/**
 * get Transportzone
 * @return Transportzone
 */
Apiomat.Adressdaten.prototype.getTransportzone = function() 
{
            return this.data.transportzone !== null ? this.data.transportzone : undefined;
    
};

/**
 * set Transportzone
 * @param Transportzone
 */
Apiomat.Adressdaten.prototype.setTransportzone = function(_transportzone) {
    this.data.transportzone = _transportzone;
};


/**
 * get UstIdNr
 * @return UstIdNr
 */
Apiomat.Adressdaten.prototype.getUstIdNr = function() 
{
            return this.data.ustIdNr !== null ? this.data.ustIdNr : undefined;
    
};

/**
 * set UstIdNr
 * @param UstIdNr
 */
Apiomat.Adressdaten.prototype.setUstIdNr = function(_ustIdNr) {
    this.data.ustIdNr = _ustIdNr;
};


/**
 * get Verkaufsbüro
 * @return Verkaufsbüro
 */
Apiomat.Adressdaten.prototype.getVerkaufsbüro = function() 
{
            return this.data.verkaufsbüro !== null ? this.data.verkaufsbüro : undefined;
    
};

/**
 * set Verkaufsbüro
 * @param Verkaufsbüro
 */
Apiomat.Adressdaten.prototype.setVerkaufsbüro = function(_verkaufsbüro) {
    this.data.verkaufsbüro = _verkaufsbüro;
};


/**
 * get VerkaufsbüroCode
 * @return VerkaufsbüroCode
 */
Apiomat.Adressdaten.prototype.getVerkaufsbüroCode = function() 
{
            return this.data.verkaufsbüroCode !== null ? this.data.verkaufsbüroCode : undefined;
    
};

/**
 * set VerkaufsbüroCode
 * @param VerkaufsbüroCode
 */
Apiomat.Adressdaten.prototype.setVerkaufsbüroCode = function(_verkaufsbüroCode) {
    this.data.verkaufsbüroCode = _verkaufsbüroCode;
};


/**
 * get Www
 * @return Www
 */
Apiomat.Adressdaten.prototype.getWww = function() 
{
            return this.data.www !== null ? this.data.www : undefined;
    
};

/**
 * set Www
 * @param Www
 */
Apiomat.Adressdaten.prototype.setWww = function(_www) {
    this.data.www = _www;
};


/**
 * get Zusatzname
 * @return Zusatzname
 */
Apiomat.Adressdaten.prototype.getZusatzname = function() 
{
            return this.data.zusatzname !== null ? this.data.zusatzname : undefined;
    
};

/**
 * set Zusatzname
 * @param Zusatzname
 */
Apiomat.Adressdaten.prototype.setZusatzname = function(_zusatzname) {
    this.data.zusatzname = _zusatzname;
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);
