<?php

namespace Ymir\YmirTyrBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * User
 *
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="Ymir\YmirTyrBundle\Entity\Project", mappedBy="user", cascade={"persist"})
     */
    private $projects;

    public function __construct()
    {
        parent::__construct();
        // your own logic
         $this->projects = new ArrayCollection();
    }

    /**
     * Set projects
     *
     * @param string $projects
     *
     * @return User
     */
    public function setProjects($projects)
    {
        $this->projects = $projects;

        return $this;
    }

    /**
     * Get projects
     *
     * @return string
     */
    public function getProjects()
    {
        return $this->projects;
    }

    /**
     * Add project
     *
     * @param \Ymir\YmirTyrBundle\Entity\Project $project
     *
     * @return User
     */
    public function addProject(\Ymir\YmirTyrBundle\Entity\Project $project)
    {
        $this->projects[] = $project;

        return $this;
    }

    /**
     * Remove project
     *
     * @param \Ymir\YmirTyrBundle\Entity\Project $project
     */
    public function removeProject(\Ymir\YmirTyrBundle\Entity\Project $project)
    {
        $this->projects->removeElement($project);
    }
}
