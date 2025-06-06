<?php

/**
 * src/Controller/Person/PersonRelationsController.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Controller\Person;

use Doctrine\ORM;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response;
use TDW\ACiencia\Controller\Element\ElementRelationsBaseController;
use TDW\ACiencia\Controller\Entity\EntityQueryController;
use TDW\ACiencia\Controller\Product\ProductQueryController;
use TDW\ACiencia\Entity\Person;

/**
 * Class PersonRelationsController
 */
final class PersonRelationsController extends ElementRelationsBaseController
{
    public static function getEntityClassName(): string
    {
        return PersonQueryController::getEntityClassName();
    }

    public static function getEntitiesTag(): string
    {
        return PersonQueryController::getEntitiesTag();
    }

    public static function getEntityIdName(): string
    {
        return PersonQueryController::getEntityIdName();
    }

    /**
     * Summary: GET /persons/{personId}/entities
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     */
    public function getEntities(Request $request, Response $response, array $args): Response
    {
        $personId = $args[PersonQueryController::getEntityIdName()] ?? 0;
        if ($personId <= 0 || $personId > 2147483647) {   // 404
            return $this->getElements($request, $response, null, EntityQueryController::getEntitiesTag(), []);
        }
        /** @var Person|null $person */
        $person = $this->entityManager
            ->getRepository(PersonQueryController::getEntityClassName())
            ->find($personId);

        $entities = $person?->getEntities()->getValues() ?? [];

        return $this->getElements($request, $response, $person, EntityQueryController::getEntitiesTag(), $entities); 
    }

    /**
     * PUT /persons/{personId}/entities/add/{stuffId}
     * PUT /persons/{personId}/entities/rem/{stuffId}
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     * @throws ORM\Exception\ORMException
     */
    public function operationEntity(Request $request, Response $response, array $args): Response
    {
        return $this->operationRelatedElements(
            $request,
            $response,
            $args,
            EntityQueryController::getEntityClassName()
        );    
    }

    /**
     * Summary: GET /persons/{personId}/products
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     */
    public function getProducts(Request $request, Response $response, array $args): Response
    {
        $personId = $args[PersonQueryController::getEntityIdName()] ?? 0;
        if ($personId <= 0 || $personId > 2147483647) {   // 404
            return $this->getElements($request, $response, null, ProductQueryController::getEntitiesTag(), []);
        }
        /** @var Person|null $person */
        $person = $this->entityManager
            ->getRepository(PersonQueryController::getEntityClassName())
            ->find($personId);

        $products = $person?->getProducts()->getValues() ?? [];

        return $this->getElements($request, $response, $person, ProductQueryController::getEntitiesTag(), $products);     
    }

    /**
     * PUT /persons/{personId}/products/add/{stuffId}
     * PUT /persons/{personId}/products/rem/{stuffId}
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     * @throws ORM\Exception\ORMException
     */
    public function operationProduct(Request $request, Response $response, array $args): Response
    {
        return $this->operationRelatedElements(
            $request,
            $response,
            $args,
            ProductQueryController::getEntityClassName()
        );    
    }

    public function optionsElements(Request $request, Response $response): Response {
        return $response
            ->withHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withStatus(204);  
    }


    public function getElementByType(Request $request, Response $response, array $args): Response{
        $personId = (int) $args['personId'];
        $elementType = $args['elementType'];

        switch ($elementType) {
            case 'products':
                return $this->getProducts($request, $response, $args);
            case 'entities':
                return $this->getEntities($request, $response, $args);
            default:
                return $this->createErrorResponse($response, 'Invalid element type', 400);
        }
    }

    public function operationElementByType(Request $request, Response $response, array $args): Response
    {
        $elementType = $args['elementType'] ?? '';
        $className = match ($elementType) {
            'products'  => \TDW\ACiencia\Controller\Product\ProductQueryController::getEntityClassName(),
            'entities' => \TDW\ACiencia\Controller\Entity\EntityQueryController::getEntityClassName(),
            default    => null,
        };

        if ($className === null) {
            return $response->withStatus(406);  // Not Acceptable
        }

        return $this->operationRelatedElements($request, $response, $args, $className);
    }
}
