class UsersController < ApplicationController
    before_action :require_login, except: [:create, :show]

  def show
    user = User.find(params.require(:id))
    render json: user
  end

  def index
    render json: User.all
  end 

  def create
    user = User.create(user_params)
    if user.valid?
      render json: { token: token(user.id), user_id: user.id  }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params.require(:id))
    user.update(user_params)
    render json: user
  end

  def destroy
    user = User.find(params.require(:id))
    user.destroy
    head :no_content
  end 

  private 
  def user_params
    params.require(:user).permit(:username, :password_digest, :bio, :avatar, :email, :location)
  end
end
