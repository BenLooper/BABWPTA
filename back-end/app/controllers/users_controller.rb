class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: :games, except: [:created_at, :updated_at]
    end

end
