export default (num)=>{
    var codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = "";
    for(let i = 0; i < num;i++){
        let index = Math.floor(Math.random() * codeStr.length);
        code += codeStr.charAt(index);
    }
    return code;
}