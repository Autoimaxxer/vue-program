import img from './a.jpg';

export default{
    template:`
            <div>
                <img :src="imgSrc" />
            </div>
    `,
    data(){
        return{
            imgSrc:img
        }
    }
}