<?php

namespace Ymir\YmirTyrBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude;

/**
 * Page
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Ymir\YmirTyrBundle\Entity\PageRepository")
 */
class Page
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @Exclude
     * @ORM\ManyToOne(targetEntity="Ymir\YmirTyrBundle\Entity\Project", inversedBy="pages", cascade={"persist"})
     * @ORM\JoinColumn(name="project", referencedColumnName="id", nullable=false)
     */
    protected $project;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Page
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set project
     *
     * @param \Ymir\YmirTyrBundle\Entity\Project $project
     *
     * @return Page
     */
    public function setProject(\Ymir\YmirTyrBundle\Entity\Project $project)
    {
        $this->project = $project;

        return $this;
    }

    /**
     * Get project
     *
     * @return \Ymir\YmirTyrBundle\Entity\Project
     */
    public function getProject()
    {
        return $this->project;
    }

    /**
     * Generate Code
     * 
     */
    public function generateCode()
    {
        // Generate the begining of the page
        $code = " <!doctype html> \n<HTML lang=\"fr\"> \n<head> \n\t<meta charset=\"utf-8\">\n";
        // Generate the title
        $code .= "\t<title>".$title."</title>\n";
        // Generate the style dependancies
        $code .= "\t<link rel=\"stylesheet\" href=\""."\">\n";
        $code .= "</head> \n<body>\n";
        // Generate the different widgets
        // for (tous nos widgets)
        // $code .= generateCodeWidget(Widget w);

        $code .= "</body>\n</html>";
        return $code;
    }
}
