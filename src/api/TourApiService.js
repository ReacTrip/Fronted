const TOUR_API_CONFIG = {
  key: 'fqJry%2BXMzG3OfIzPup5MZNOTmNCbr3lY%2FzkZ%2FEJQ61zuEvZPCrTG3YRsWxhOQTsrSWA8fydBszKR04ecBbknmg%3D%3D',
  defaultParams: {
    MobileOS: 'ETC',
    MobileApp: 'TripPlanner',
    numOfRows: '10',
    pageNo: '1'
  }
};

export const tourApiService = {
  // XML을 파싱하는 유틸리티 함수
  parseXMLResponse(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    // 에러 체크
    const errorMsg = xmlDoc.querySelector("errMsg");
    if (errorMsg) {
      throw new Error(`API Error: ${errorMsg.textContent}`);
    }

    const items = xmlDoc.getElementsByTagName("item");
    const result = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const obj = {};
      for (let j = 0; j < item.children.length; j++) {
        const child = item.children[j];
        obj[child.tagName] = child.textContent;
      }
      result.push(obj);
    }

    return result;
  },

  // 관광지 집중률 정보 조회
  async getVisitationForecast(areaCode) {
    try {
      const params = {
        ...TOUR_API_CONFIG.defaultParams,
        serviceKey: TOUR_API_CONFIG.key,
        areaCode
      };

      const queryString = new URLSearchParams(params).toString();
      const url = `/api/B551011/TatsCnctrRateService/getTatsCnctrRateInfo?${queryString}`;
      
      console.log('Request URL:', url);
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/xml'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      const data = this.parseXMLResponse(xmlText);
      return { response: { body: { items: { item: data } } } };
    } catch (error) {
      console.error('Error fetching visitation forecast:', error);
      return { response: { body: { items: { item: [] } } } };
    }
  },

  // 연관 관광지 정보 조회
  async getRelatedAttractions(areaCode, sigunguCode = null) {
    try {
      const params = {
        ...TOUR_API_CONFIG.defaultParams,
        serviceKey: TOUR_API_CONFIG.key,
        areaCode,
        sigunguCode
      };

      const queryString = new URLSearchParams(params).toString();
      const url = `/api/B551011/TarRlteTarService/getTarRlteTarList?${queryString}`;
      
      console.log('Request URL:', url);
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/xml'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      const data = this.parseXMLResponse(xmlText);
      return { response: { body: { items: { item: data } } } };
    } catch (error) {
      console.error('Error fetching related attractions:', error);
      return { response: { body: { items: { item: [] } } } };
    }
  }
};

export default tourApiService;