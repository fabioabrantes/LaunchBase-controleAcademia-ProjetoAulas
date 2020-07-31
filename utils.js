module.exports = {
  age: function(timestamp){
    const today = new Date();
    const birthDate = new Date (timestamp);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if(month < 0 || month ==0 && today.getDate() - birthDate.getDate() < 0){
      age = age - 1;
    }
    return age;
  },
  date: function(timestamp){
    const date =  new Date(timestamp);

    // yyyy
    const year = date.getUTCFullYear();
    //mm
    const month = `0${date.getMonth() + 1}`.slice(-2);
    //dd
    const day = `0${date.getDate()}`.slice(-2);

    //return yyyy-mm-dd
    return {
            day,
            month,
            year,
            iso:`${year}-${month}-${day}`,
            birthDay:`${day}/${month}`
          }
  
  },
  replaceBlood: function(value){
    
    const num = value.slice(-1);
    let blood = '';
    if(num == 1){
      blood = value.replace(num,'+');
    }else{
      blood = value.replace(num,'-');
    }
    return blood;
  }
}