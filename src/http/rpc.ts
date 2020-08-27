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
};
  