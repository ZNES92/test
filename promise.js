
const ProState = {
    Pending: 0,
    FullFilled: 1,
    Rejected: 2
}

function Pro(excutor){
    this.state = 0;
    this.resFunc = undefined;
    this.rejFunc = undefined;
    this.already = false;
    this.resArgs = undefined;
    this.rejArgs = undefined;

    excutor((...args)=>{
        this.resArgs = args;
        this.state = ProState.FullFilled;
        this.onStateChange();
    },(...args)=>{
        this.rejArgs = args;
        this.state = ProState.Rejected;
        this.onStateChange();
    });
}

Pro.prototype = {
    then(res,rej){
        if( this.state == ProState.Pending ){
            this.already = true;
            this.resFunc = res;
            this.rejFunc = rej;
        }
        if( this.state == ProState.FullFilled ){
            res(...this.resArgs);
        }
        if( this.state == ProState.Rejected ){
            rej(...this.rejArgs);
        }
    },
    onStateChange(){
        if( this.already ){
            if( this.state == ProState.FullFilled ){
                this.resFunc(...this.resArgs);
            }
            if( this.state == ProState.Rejected ){
                this.rejFunc(...this.rejArgs);
            }
        }
    }
}