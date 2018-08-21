#pragma once
#include <list>
#include <vector>
#include <unordered_map>

template <typename Vertex>
class Graph {
public:
    /*!
     * \brief Add a given vertex to the Graph
     *
     * \param v a vertex
     */
    void addVertex(Vertex & v);
  
    /*!
     * \brief Remove a given vertex from the Graph
     *
     * \param v a vertex
     */

    void removeVertex(Vertex & v);
    /*!
     * \brief Connects two vertices by adding an
     *        edge between them.
     * \param v1 the first vertex
     * \param v2 the second vertex
     */
    
    void connect(Vertex & v1, Vertex & v2);
    void disconnect(Vertex & v1, Vertex & v2);
    int order();
    std::unordered_map<std::list<Vertex>> & getVertices();
    Vertex & getRandomVertex();
    std::list<Vertex> getAdjacentVertices(Vertex &v);
    int degree(Vertex &v);
private:
    std::unordered_map<Vertex, std::list> vertexMap;        
};
