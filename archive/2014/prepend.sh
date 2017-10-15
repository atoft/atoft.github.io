#!/bin/bash

for fn in *.html; do
	echo -e "---\n\n---\n$(cat $fn)" > $fn
	echo $fn
done

