class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: :games, except: [:created_at, :updated_at]
    end

    def create 
        new_user = User.new(
            name:params[:name], 
            username:params[:username],
            password:params[:password],
            image_url:params[:image_url]
            )

        if new_user.save && params[:password] == params[:passConf]
            render json: new_user, include: [:games], except: [:password_digest,:updated_at,:created_at]
        else 
            render json: {error:"There was a problem creating your account :("}
        end 
    end 

end
