//获取当前毫秒时间戳
export class time {
    public getMillisecond() : number {
        return new Date().getTime();
    };
    
    //获取10位时间戳对应的时间
    public formatDayDateTime(timeStamp: number) : string {   
        let date: any = new Date();  
        date.setTime(timeStamp * 1000);  
        const y = date.getFullYear();      
        let m = date.getMonth() + 1;      
        m = m < 10 ? ('0' + m) : m;      
        let d = date.getDate();      
        d = d < 10 ? ('0' + d) : d;         
        return y + '.' + m + '.' + d;      
    };
}

const instance = new time();
export default instance;
  