export default function FirstPage(props){
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 ">
                    <h1 className="text-success">PicDapp</h1>
                    <h2 className="text-primary">Connect your account to use the dapp</h2>
                </div>
                <div className="my-5 p-5 col-sm-12 col-md-6 offset-md-3 border border-success d-flex justify-content-center flex-column align-items-center">
                    <p className="text-danger h1">Connect your Wallet</p>
                    <p className="btn btn-primary" onClick={() => props.handleClick()}>Connect</p>
                </div>
            </div>
        </div>
    );
}