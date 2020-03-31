Project outline - Try to get a kind of ray cast based game up and running
using marching circles.

Stage 1 - get a minimap setup - create blocks and a moving player with a 
view fustrum.
  Only really need lines - create a vector object and line object.
  Minimap object
  Some key listeners.

Stage 2 - write system to find distance to closest obstacle.
        - Create one ray coming out of player and draw on minimap.
        - Find closest obstacle and march one step.
        - March until distance < epsilon.
        - Create other rays.

Stage 3 - Translate these distances into graphics.
        - Done
        
Stage 4 - Fix fish eye.
        - Add floor and ceiling.

Fish eye: Find distance as if the eye was directly in front of object.
Know the distance and I know the x offset. 