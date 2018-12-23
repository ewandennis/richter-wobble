#!/bin/sh

ffmpeg -framerate 30 -i $1%07d.png -c:v libx264 -preset veryslow -crf 17 -tune animation -vf "fps=30,format=yuv420p" $2.mp4
