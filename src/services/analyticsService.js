const months=['Jun','Jul','Aug','Sep','Oct','Nov'];
// Sample series. Replace with a backend analytics endpoint later.
export default {trend:(k=0)=>months.map((m,i)=>({m,score:62+i*5+(i%2)*3+k,done:30+i*11+k*2}))};
