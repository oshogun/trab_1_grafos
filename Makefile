CC=g++
INCLUDEDIR=include
SRCDIR=include
OBJDIR=obj

all:
	g++ ${SRCDIR}/*.cpp -o grafos

clean:
	rm grafos
