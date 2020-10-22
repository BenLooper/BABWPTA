class SessionsController < ActionController::API
  
  def create
    user = User.find_by username:params[:username]
    if user && user.authenticate(params[:password])
      render json: user, include: [:games], except: [:password_digest,:updated_at,:created_at]
    else
      render json: {error:"Incorrect username or password"}
    end
  end 

end 


