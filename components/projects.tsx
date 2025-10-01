"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Search, Filter, Star, Calendar, Code2, Grid, List, Eye, TrendingUp } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"


export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const checkMobile = useIsMobile()

  const projects = [
    {
      title: "Opinion polling system",
      description:
        "Collaborative opinion poll management tool with real-time updates, about 70% coded with Lovable code generating platform and advanced data analytics dashboard.",
      image: "/opinion.jpg",
      technologies: ["Next.js", "SQL", "Supabase", "Tailwind CSS", "Chart.js"],
      liveUrl: "https://opinion-nexus-voter.lovable.app/",
      githubUrl: "#",
      featured: true,
      category: "SaaS",
      year: "2025",
      status: "Live",
    },
    {
      title: "Scene Apps Website",
      description:
        "Main website for Scene Apps mobile; a full feature social media platform.",
      image: "/scene-apps.jpg",
      technologies: ["React", "Tailwind CSS", "Replit"],
      liveUrl: "https://sceneapps.com",
      githubUrl: "https://github.com/TesleemOla/SceneApps",
      featured: false,
      category: "Frontend",
      year: "2025",
      status: "Live",
    },
    {
      title: "Staff management system",
      description:
        "A staff management system for employees data and arrival times logging.",
      image: "/staff-mgt.jpg",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Render",
        "Bolt.new",
      ],
      liveUrl: "mstaff-mgt.vercel.app",
      githubUrl: "https://github.com/TesleemOla/mstaff-mgt-be",
      featured: false,
      category: "Full-Stack",
      year: "2025",
      status: "Live",
    },
    {
      title: "Polyglot learning platform",
      description:
        "An AI assisted language learning platform built with Gemini AI SDK",
      image: "/polyglot.jpg",
      technologies: [
        "Next.js",
        "Node.js",
        "React-query",
        "Express",
        "MongoDB",
        "Gemini AI",
        "Encryption",
      ],
      liveUrl: "https://polyglot-journey.vercel.app/",
      githubUrl: "#",
      featured: true,
      category: "Full-Stack",
      year: "2025",
      status: "Live",
    },
    {
      title: "The bass Product Page",
      description:
        "Beautiful weather application with detailed forecasts, interactive maps, weather alerts, and location-based services.",
      image: "/on.png",
      technologies: ["React"],
      liveUrl: "https://thebaas.vercel.app/",
      githubUrl: "https://github.com/TesleemOla/Thebaas",
      featured: false,
      category: "Frontend",
      year: "2024",
      status: "Live",
    },
    {
      title: "Polyglot learner API",
      description:
        "Scalable API gateway with rate limiting, authentication,using GEMINI AI SDK to help users learn new languages.",
      image: "/api-gateway-architecture.png",
      technologies: [
        "Node.js",
        "Express",
        "Render",
        "MongoDB",
        "Swagger UI",
        "Gemini AI SDK",
      ],
      liveUrl: "https://learnpath-gemini.onrender.com/api/docs/",
      githubUrl: "https://github.com/TesleemOla/LearnPath-Gemini",
      featured: false,
      category: "Backend",
      year: "2025",
      status: "Live",
    },
    {
      title: "Sleepstiq Ecommerce",
      description: "Client side for an ecommerce website.",
      image: "/sleepstiq.jpg",
      technologies: ["Next.js", "Tailwind css", "Git", "Github"],
      liveUrl: "https://sleepstiq-mu.vercel.app/",
      githubUrl: "https://github.com/TesleemOla/sleepstiq",
      featured: false,
      category: "Frontend",
      year: "2024",
      status: "Live",
    },
    {
      title: "Admin Dashboard",
      description: "A frontend admin dashboard built with RTK Query",
      image: "/admind.jpg",
      technologies: ["React.js", "CSS", "Git", "Github", "Redux toolkit", ""],
      liveUrl: "https://admin-dashboard-beryl.vercel.app/",
      githubUrl: "https://github.com/TesleemOla/admin-dashboard",
      featured: false,
      category: "Frontend",
      year: "2023",
    },
    {
      title: "Ecommerce",
      description:
        "Ecommerce website made with FakeStore API and Flutterwave secure checkout",
      image: "/fsapi.jpg",
      technologies: [
        "React.js",
        "Bootstrap",
        "CSS",
        "Fake store API",
        "Flutterwave secure Checkout",
        "Git",
        "Github",
      ],
      liveUrl: "https://ecommercefsapi.vercel.app/",
      githubUrl: "https://github.com/TesleemOla/ecommercefsapi",
      featured: false,
      category: "Frontend",
      year: "2022",
    },
  ];

  const categories = ["All", "Full-Stack", "Frontend", "Backend", "SaaS"]

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = selectedFilter === "All" || project.category === selectedFilter
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const featuredProjects = filteredProjects.filter((p) => p.featured)
  const otherProjects = filteredProjects.filter((p) => !p.featured)



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true)
          }
          if (entry.target === projectsRef.current && entry.isIntersecting) {
            filteredProjects.forEach((_, index) => {
              setTimeout(() => {
                setVisibleProjects((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (projectsRef.current) observer.observe(projectsRef.current)

    return () => observer.disconnect()
  }, [filteredProjects])

  // Reset visible projects when filters change
  useEffect(() => {
    setVisibleProjects([])
    setTimeout(() => {
      filteredProjects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects((prev) => [...prev, index])
        }, index * 100)
      })
    }, 100)
  }, [selectedFilter, searchTerm])

  useEffect(()=>{
    if (checkMobile){
      setViewMode("list")
    }
  },[checkMobile])
  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden bg-background"
      
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-amber-500/20 to-pink-500/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-display text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p
            className={`text-xl text-foreground max-w-3xl mx-auto mb-8 transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            A showcase of my recent work, demonstrating expertise across the full stack with modern technologies
          </p>

         

          {/* Enhanced Search and Filter Controls */}
          <div
            className={`flex flex-col lg:flex-row gap-6 items-center justify-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 glass-effect border-white/20 text-foreground placeholder:text-slate-400 focus:border-pink-400 focus:ring-pink-400/20"
              />
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(category)}
                  className={`transition-all duration-300 h-12 px-6 ${
                    selectedFilter === category 
                      ? "bg-foreground text-background hover:to-violet-600 border-0 shadow-lg"
                      : "glass-effect border-white/20 text-foreground hover:bg-white/10 hover:border-pink-400 hover:text-pink-400"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-12 px-4 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                    : "glass-effect border-white/20 text-slate-200 hover:border-cyan-400 hover:text-cyan-400"
                }`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-12 px-4 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-cyan-500/20 border-cyan-400 text-foreground"
                    : "glass-effect border-white/20 text-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-16 mb-20">
            {featuredProjects.map((project, index) => (
              <Card
                key={`featured-${index}`}
                className={`overflow-hidden group hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-700 hover:scale-[0.9] glass-effect border-white/20 ${
                  visibleProjects.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  <div className={`relative overflow-hidden ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className={`w-full h-80 lg:h-full object-contain transition-all duration-700 ${
                        hoveredProject === index ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent transition-opacity duration-500 ${
                        hoveredProject === index ? "opacity-100" : "opacity-60"
                      }`}
                    />

                    {/* Enhanced Project Stats Overlay */}
                    <div
                      className={`absolute top-6 right-6 flex flex-col gap-3 transition-all duration-500 ${
                        hoveredProject === index ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                      }`}
                    >
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-foreground border-0 shadow-lg">
                        <Calendar className="w-3 h-3 mr-1" />
                        {project.year}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-foreground border-0 shadow-lg">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {project.status}
                      </Badge>
                     
                    </div>
                  </div>

                  <div className="p-10 lg:p-16 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-foreground text-background border-0 px-4 py-2 text-sm shadow-lg">
                          <Star className="w-4 h-4 mr-2" />
                          Featured Project
                        </Badge>
                        <Badge className="glass-effect border-white/20 text-foreground px-3 py-1">
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="font-display text-3xl font-bold mb-4 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                        {project.title}
                      </h3>
                      <p className="text-foreground leading-relaxed mb-8 text-lg">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          className={`text-sm transition-all duration-300 hover:scale-110 cursor-pointer glass-effect bg-red-900 text-foreground hover:border-pink-400 hover:text-pink-400 ${
                            hoveredProject === index ? "animate-pulse" : ""
                          }`}
                          style={{ animationDelay: `${techIndex * 100}ms` }}
                        >
                          <Code2 className="w-4 h-4 mr-2" />
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        asChild
                        className="bg-foreground text-background border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground transition-all duration-300 hover:scale-105 group/btn shadow-lg px-8 py-3"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-5 h-5 mr-2 group-hover/btn:rotate-12 transition-transform" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="glass-effect border-white/20 text-foreground hover:bg-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:scale-105 group/btn px-8 py-3 bg-transparent"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-5 h-5 mr-2 group-hover/btn:rotate-12 transition-transform" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div ref={projectsRef}>
            <h3
              className={`font-display text-3xl font-bold text-center mb-12 text-foreground transition-all duration-1000 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              More <span className="gradient-text">Projects</span>
            </h3>

            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {otherProjects.map((project, index) => {
                const actualIndex = featuredProjects.length + index
                return viewMode === "grid" ? (
                  <Card
                    key={`other-${index}`}
                    className={`overflow-hidden group hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-500 hover:scale-105 glass-effect border-white/20 cursor-pointer ${
                      visibleProjects.includes(actualIndex) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-56 object-contain group-hover:scale-90 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Enhanced Hover Actions */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            asChild
                            className="bg-foreground text-background border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground flex-1 shadow-lg"
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Demo
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="glass-effect border-white/30 text-foreground hover:bg-white/20 flex-1"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Enhanced Project Info Overlay */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-foreground border-0 text-xs shadow-lg">
                          {project.year}
                        </Badge>
                       
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h4 className="font-display font-semibold text-xl text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                          {project.title}
                        </h4>
                        <Badge className="glass-effect border-white/20 text-foreground text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            className="text-xs hover:scale-105 transition-transform glass-effect border-background/20 text-foreground hover:border-pink-400 hover:text-pink-400"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge className="text-xs glass-effect border-foreground/20 text-foreground">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ) : (
                  // List View
                  <Card
                    key={`other-list-${index}`}
                    className={`overflow-hidden group hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-500 glass-effect border-white/20 ${
                      visibleProjects.includes(actualIndex) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="grid md:grid-cols-4 gap-6 p-6">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-display font-semibold text-lg text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                            {project.title}
                          </h4>
                          <Badge className="glass-effect border-white/20 text-foreground text-xs">
                            {project.category}
                          </Badge>
                        </div>
                        <p className="text-foreground text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} className="text-xs glass-effect border-white/20 text-foreground">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center gap-3">
                        <div className="flex gap-2 text-xs text-foreground">
                          <span>{project.year}</span>
                          <span>•</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            asChild
                            className="bg-foreground text-background border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground flex-1"
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Demo
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="glass-effect border-white/20 text-foreground hover:bg-white/10 bg-transparent"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-300 mb-6">
              <Search className="w-16 h-16 mx-auto mb-6 opacity-50" />
              <p className="text-xl mb-2">No projects found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search or filter options.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedFilter("All")
              }}
              className="mt-4 bg-foreground text-background border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
