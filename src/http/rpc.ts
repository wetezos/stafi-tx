import axios from 'axios';

const toastTimeout = 500;

export default class Rpc {
  //上传邮件
  public fetchClaimList(postData: any) {
    return this.post(
      'https://drop.stafi.io/stafi/v1/webapi/drop/chaimslist',
      postData
    );
  }

  //上传转账信息
  public fetchTx(postData: any) {
    return this.post(
      'https://drop.stafi.io/stafi/v1/webapi/drop/addtx',
      postData
    );
  }

  //getEthPrice
  public getPrice(symbol: any) {
    return this.get(
      'https://api.huobi.pro/market/detail/merged?symbol=' + symbol,
      {}
    );
  }

  //getEthPrice
  public getGasPrice() {
    let ethUrl = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=I4NIJIVZ5KPZ5JHCPTU1DTNJWEKTIHSVZV';
    return this.get(
      ethUrl,
      {}
    );
  }

    //getGasPricePost
    public getGasPricePost() {
      let postData = {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        id: 1
      };
      return this.post(
        'https://mainnet.infura.io/v3/c19e30bc94354bb2b938878922be3907',
        postData
      );
    }

  public post(api: any, postData: any) {
    postData = postData ? postData : {};
    postData.timestamp = new Date().getTime();
    return new Promise(resolve => {
      axios.post(
        api,
        postData
      )
      .then(response => {
          let data = response.data;
          resolve(data);
        })
        .then(null, function(error) {
          console.log(error);
          let isToast = postData.isLoading === false ? false : true;
          if (isToast) {
            setTimeout(function() {
              console.log('Error: please try again');
            }, toastTimeout);
          }
        });
    });
  }


  public get(api: any, getData: any) {
    getData = getData ? getData : {};
    return new Promise(resolve => {
      axios.get(
        api,
        getData
      )
      .then(response => {
          let data = response.data;
          resolve(data);
        })
        .then(null, function(error) {
          console.log(error);
          let isToast = getData.isLoading === false ? false : true;
          if (isToast) {
            setTimeout(function() {
              console.log('Error: please try again');
            }, toastTimeout);
          }
        });
    });
  }


};
  