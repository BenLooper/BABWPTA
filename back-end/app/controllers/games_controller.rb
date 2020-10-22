class GamesController < ActionController::API

    def create
        user = User.find(params[:user_id])
        game = Game.create(
            score:params[:score], 
            reaction:params[:reaction], 
            user:user
            )
        render json: game 
    end 


end 