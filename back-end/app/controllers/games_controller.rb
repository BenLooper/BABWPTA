class GamesController < ActionController::API

    def create
        user = User.find(params[:user_id])
        game = Game.create(
            score:params[:score], 
            reaction:params[:reaction], 
            user:user
            )
        games = user.games
        render json: games
    end 


end 