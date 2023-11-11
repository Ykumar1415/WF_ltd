import useUserStore from './Store/store';

// const {  pushallDistributors } = useUserStore();
export default () => {
  self.addEventListener('message',  (e) => { // eslint-disable-line no-restricted-globals
    if (!e) return;
    let { customers, type } = e.data;
 
 
    let start = Date.now();
    let costomer_code_Array = [];
  
      for (let i = 0; i < customers.length; i++) {
        costomer_code_Array.push(customers[i].customer_code);
      }
     
    postMessage(costomer_code_Array);
  })
}