class SessionsController < ActionController::API
  
  def create
    user = User.find_by username:params[:username]
    if user && user.authenticate(params[:password])
      session[:id] = user.id
      render json: user
    else
      render json: {error:"Incorrect username or password"}
    end
  end 
end 


