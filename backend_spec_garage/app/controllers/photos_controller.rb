class PhotosController < ApplicationController
    def index
        render json: Photo.all
    end 

    def show
        photo = Photo.find(params.require(:id))
        render json: photo
      end
    
    def create
        photo = Photo.create(photo_params)
        if photo.valid?
          render json: photo
        else
          render json: { errors: photo.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def update
        photo = Photo.find(params.require(:id))
        photo.update(car_params)
        head :no_content
      end
    
      def destroy
        photo = Photo.find(params.require(:id))
        photo.destroy
        head :no_content
      end 

      private 
      def photo_params
        params.require(:photo).permit(:url, :description, :car_id)
      end
end
