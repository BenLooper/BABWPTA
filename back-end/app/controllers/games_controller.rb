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
    
    def update
        game = Game.find(params[:id])

        game.update(
            reaction:params[:reaction],
        )

        user = game.user 

        render json: user, include: [:games], except: [:password_digest,:updated_at,:created_at]
    end 

    def destroy 
        game = Game.find(params[:id])

        user = User.find(game.user.id)

        Game.destroy(params[:id])

        render json: user, include: [:games], except: [:password_digest,:updated_at,:created_at]
    end 

end 