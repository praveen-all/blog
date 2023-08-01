
  export const sorting=async(sortValue)=>{
    return await sortValue.sort((a, b) => {
    let ab = new Date(a.timestamp);
    let bc = new Date(b.timestamp);
    return ab - bc;
  })
  }

