class VideosController < ApplicationController

    def index
        render json: Video.all
    end 

    def show
        video = Video.find(params.require(:id))
        render json: video
      end
    
    def create
        video = Video.create(video_params)
        if video.valid?
          render json: video
        else
          render json: { errors: video.errors.full_messages }, status: :unprocessable_entity
        end
      end

    
      def destroy
        video = Video.find(params.require(:id))
        video.destroy
        head :no_content
      end 

      private 
      def video_params
        params.require(:video).permit(:youtube_link, :car_id)
      end
end
