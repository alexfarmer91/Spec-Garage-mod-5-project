class FollowsController < ApplicationController
    def index
        render json: Follow.all
    end 

    def show
        part = Follow.find(params.require(:id))
        render json: part
      end
    
    def create
        part = Follow.create(part_params)
        if part.valid?
          render json: part
        else
          render json: { errors: part.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def update
        part = Follow.find(params.require(:id))
        part.update(car_params)
        head :no_content
      end
    
      def destroy
        part = Follow.find(params.require(:id))
        part.destroy
        head :no_content
      end 

      private 
      def follow_params
        params.require(:car).permit(:follower_id, :followed_user_id)
      end
end
