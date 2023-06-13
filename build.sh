#!/bin/bash

# Set variables for source and destination directories
source_dir="/home/me3za/dtb"
destination_dir="/home/me3za/productiondtb"

# Copy the backend directory to the destination directory
cp -r "$source_dir/backend" "$destination_dir"

# Change to the frontend directory
cd "$source_dir/frontend"

# Run the build command
npm run build

# Copy the build output to the backend directory in the destination
cp -r "$source_dir/frontend/build" "$destination_dir/backend"

# Change to the destination directory
cd "$destination_dir"

# Add all files to the Git repository
git add .

# Commit changes with a message
commit_message="Production deployment $(date +'%Y-%m-%d %H:%M:%S')"
git commit -m "$commit_message"

# Push changes to the remote repository
git push

# Check if the Git push was successful
if [ $? -eq 0 ]; then
  echo "Deployment successful."
else
  echo "Deployment failed. Please check the error logs."
fi
