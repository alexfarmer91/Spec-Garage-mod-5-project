class FollowsController < ApplicationController
    def index
        render json: Follow.all
    end 

    def show
        follow = Follow.find(params.require(:id))
        render json: follow
      end
    
    def create
        follow = Follow.create(follow_params)
        if follow.valid?
          render json: follow
        else
          render json: { errors: follow.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def destroy
        follow = Follow.find(params.require(:id))
        follow.destroy
        render json: follow
      end 

      private 
      def follow_params
        params.require(:follow).permit(:follower_id, :followed_user_id)
      end
end
