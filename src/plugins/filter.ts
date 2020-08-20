// 过滤日期格式，传入时间戳，根据参数返回不同格式
const formatTimer = function(e: any): string {
  let a: string | number = "";
  if (e) {
    let dateTimer = new Date(e * 1000);
    let y = dateTimer.getFullYear();
    let M: string | number = dateTimer.getMonth() + 1;
    let d: string | number = dateTimer.getDate();
    let h: string | number = dateTimer.getHours();
    let m: string | number = dateTimer.getMinutes();
    M = M >= 10 ? M : "0" + M;
    d = d >= 10 ? d : "0" + d;
    h = h >= 10 ? h : "0" + h;
    m = m >= 10 ? m : "0" + m;
    a = y + "-" + M + "-" + d;
  }
  return a;
};
export { formatTimer };
