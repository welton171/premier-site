"use strict";

/* eslint-disable @typescript-eslint/consistent-type-definitions */

console.log('utms script loaded! 2.3.7');
window.paramsList = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term', 'xcod', 'src'];
window.itemExpInDays = 7;
function getExpKey(key) {
  return `${key}_exp`;
}
function saveParams() {
  const params = new URLSearchParams(window.location.search);
  const saveItem = (key, value) => {
    localStorage.setItem(key, value);
    const expDate = new Date(new Date().getTime() + window.itemExpInDays * 24 * 60 * 60 * 1000);
    localStorage.setItem(getExpKey(key), expDate.toISOString());
  };
  window.paramsList.forEach(param => {
    const value = params.get(param);
    if (value) {
      saveItem(param, value);
    }
  });
}
function getCompleteParams() {
  const UTM_AD_OBJECT_TYPE_SEPARATOR = 'hQwK21wXxR';
  const searchParamsFromUrl = new URLSearchParams(window.location.search);
  function getParam(key) {
    const valueInUrl = searchParamsFromUrl.get(key);
    const valueInUrlIsNullable = valueInUrl == null || valueInUrl === 'null' || valueInUrl === 'undefined' || valueInUrl === '';
    if (!valueInUrlIsNullable) return valueInUrl;
    const valueInLocalStorage = localStorage.getItem(key);
    if (!valueInLocalStorage) return '';
    const itemExpDate = localStorage.getItem(getExpKey(key));
    const expired = !itemExpDate || new Date(itemExpDate) < new Date();
    if (expired) {
      localStorage.removeItem(key);
      localStorage.removeItem(getExpKey(key));
      return '';
    }
    return valueInLocalStorage;
  }
  function getHotmartGroupedParams(values) {
    return values.join(UTM_AD_OBJECT_TYPE_SEPARATOR);
  }
  function reduceStrLengthForHotmart(value, maxLength) {
    if (value.length <= maxLength) return value;
    const shortener = '...';
    const separatorTotalLength = UTM_AD_OBJECT_TYPE_SEPARATOR.length * 4;
    const shortenerTotalLength = shortener.length * 4;
    const idsTotalLength = 20 * 4;
    const maxLengthPerPart = Math.floor((maxLength - separatorTotalLength - shortenerTotalLength - idsTotalLength) / 5);
    function reducePart(part, useSplit) {
      function shortenPart(part) {
        return part.substring(0, maxLengthPerPart) + shortener;
      }
      if (!useSplit) {
        return shortenPart(part);
      }
      const sections = part.split('|');
      const id = sections[sections.length - 1];
      const name = sections.slice(0, -1).join('|');
      const reducedName = shortenPart(name);
      return `${reducedName}|${id}`;
    }
    const [utmSource, utmCampaign, utmMedium, utmContent, utmTerm] = value.split(UTM_AD_OBJECT_TYPE_SEPARATOR);
    return getHotmartGroupedParams([reducePart(utmSource, false), reducePart(utmCampaign, true), reducePart(utmMedium, true), reducePart(utmContent, true), reducePart(utmTerm, false)]);
  }
  const utmSource = getParam('utm_source');
  const utmCampaign = getParam('utm_campaign');
  const utmMedium = getParam('utm_medium');
  const utmContent = getParam('utm_content');
  const utmTerm = getParam('utm_term');
  const classicParams = [utmSource, utmCampaign, utmMedium, utmContent, utmTerm];
  const groupedParamsString = getHotmartGroupedParams(classicParams);
  const completeParams = new URLSearchParams();
  completeParams.set('utm_source', utmSource);
  completeParams.set('utm_campaign', utmCampaign);
  completeParams.set('utm_medium', utmMedium);
  completeParams.set('utm_content', utmContent);
  completeParams.set('utm_term', utmTerm);
  const xcod = getParam('xcod');
  const src = getParam('src');
  const alternativeHotmart = xcod !== '' ? xcod : src;
  const allClassicParamsEmpty = classicParams.every(p => p === '');
  const hotmartValue = allClassicParamsEmpty ? alternativeHotmart : groupedParamsString;
  const shortHotmartValue = reduceStrLengthForHotmart(hotmartValue, 255);
  completeParams.set('xcod', shortHotmartValue);
  completeParams.set('sck', shortHotmartValue);
  return completeParams;
}
function work() {
  saveParams();
  function rebuildLinks() {
    const completeParams = getCompleteParams();
    document.querySelectorAll('a').forEach(e => {
      if (e.href.startsWith('mailto:')) return;
      if (e.href.startsWith('tel:')) return;
      if (e.href.startsWith('whatsapp:')) return;
      if (e.href.includes('#')) return;
      // if (e.href.startsWith('#') || e.href.includes(`${e.host}#`) || e.href.includes(`${e.host}/#`)) return;

      const char = e.href.indexOf('?') === -1 ? '?' : '&';
      e.href += char + (completeParams?.toString() ?? '');
    });
  }
  function rebuildForms() {
    const completeParamsStr = encodeURIComponent(getCompleteParams()?.toString() ?? '');
    const forms = document.querySelectorAll('form');
    console.log('forms', forms);
    forms.forEach(form => {
      function getCharForAction(action) {
        if (action.indexOf('redirect_url')) {
          return '?';
        }
        return action.indexOf('?') === -1 ? '?' : '&';
      }
      const char = getCharForAction(form.action);
      form.action += `${char}${completeParamsStr}`;
      console.log('new action', form.action);
    });
  }
  function configWindowOpen() {
    const saveOpen = window.open;
    window.open = function (url, windowName, parms) {
      const char = url?.toString().indexOf('?') === -1 ? '?' : '&';
      url += char + (getCompleteParams()?.toString() ?? '');
      return saveOpen(url, windowName || '', parms || '');
    };
  }
  rebuildLinks();
  rebuildForms();
  configWindowOpen();
}
if (document.readyState === 'complete') {
  work();
} else {
  window.addEventListener('load', work);
}