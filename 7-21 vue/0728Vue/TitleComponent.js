
// 在這邊寫 compoment
export default{
    props: {
        Name :{
            type:String,
            required:true
        },
        Age:{
            type:Number,
            required:true
        }
    },
    template:'<h1>{{Name}} {{Age}}</h1>' //元件化的東西
}